//module of products selector
var twoSideSelector = (function () {

    var leftArea, rightArea, unselectedData, selectedData, allData, includingStrategy;

    function F(placeholder, opts) {
        init(opts);

        render(placeholder, allData, selectedData, includingStrategy);

        bindEvents();
    }

    var init = function (opts) {
        selectedData = opts.selectedData;
        allData = opts.allData;
        includingStrategy = opts.includingStrategy;
    };

    var deepCopy = function (o) {
        var copy = o, k;

        if (o && typeof o === 'object') {
            copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
            for (k in o) {
                copy[k] = deepCopy(o[k]);
            }
        }

        return copy;
    };

    var createSelect = function () {
        return document.createElement('select');
    };

    var createBtn = function (text) {
        var textNode = document.createTextNode(text),
            btn = document.createElement('a');
        btn.appendChild(textNode);
        return btn;
    };

    var render = function (placeholder, allData, selectedData, includingStrategy) {
        renderLayout(placeholder);

        unselectedData = calUnselectedData(allData, selectedData);

        renderItems(unselectedData, selectedData, includingStrategy);
    };

    var findIndex = function (id, arr, property) {
        var index = -1, propertyName = property || 'id';

        if (!!arr && arr.length > 0) {

            for (var i = 0, length = arr.length; i < length; i++) {
                if (arr[i][propertyName] === id) {
                    index = i;
                }
            }
        }

        return index;
    };

    var findItem = function (id, arr, property) {
        var result = null;

        var index = findIndex(id, arr, property);
        if (index !== -1) {
            result = arr[index];
        }

        return result;
    };

    var deleteItem = function (id, list) {
        var index = findIndex(id, list);
        if (index !== -1) {
            list.splice(index, 1);
        }
    };

    var addItem = function (id, list, tobeAdded) {
        var item = findItem(id, list);
        tobeAdded.push(item);
    };

    var calUnselectedData = function (allData, selectedData) {
        var unselectedData = deepCopy(allData);

        if (!selectedData) {
            return
        }

        for (var i = 0; i < selectedData.length; i++) {
            var list = selectedData[i]['list'],
                id = 'group',
                tokenGroup = findItem(selectedData[i][id], unselectedData, id);
            console.log(tokenGroup);

            if (!!tokenGroup) {
                for (var j = 0; j < list.length; j++) {
                    deleteItem(list[j].id, tokenGroup['list']);
                    //var token = findItem( list[j].id, tokenGroup['list']);
                    //console.log(token);
                }
            }
        }
        console.log(unselectedData);
        console.log(selectedData);
        return unselectedData;

    };

    var drawOptions = function (data, includingStrategy, placeholder) {
        var index = 0;
        for (var i = 0; i < data.length; i++) {
            var list = data[i]['list'];
            if (list && list.length > 0) {
                var tokenNameMap = {};
                var optgroup = $('<optgroup class="category" label="' + data[i]['group'] + '" cate="' + data[i]['group'].replace(/[ ]/g, '_') + '"></optgroup>');
                for (var j = 0; j < list.length; j++) {
                    var tokenName = list[j].name;
                    if (tokenNameMap[tokenName]) {
                        continue;
                    } else {
                        tokenNameMap[tokenName] = 1;
                    }
                    if (list[j].strategy && !includingStrategy) {
                        continue;
                    }
                    var classStr = 'class="';
                    if (list[j].internal) {
                        classStr += 'internal';
                        if (list[j].strategy) {
                            classStr += ' strategy';
                        }
                    }
                    classStr += '"';
                    var li = $('<option ' + classStr + ' idx="' + index + '" value="' + list[j].id + '" category="' + data[i]['group'] + '" title="' + list[j].name + '">' + list[j].name + '</option>');
                    index++;
                    optgroup.append(li);
                }
                if (optgroup.children().length > 0) {
                    placeholder.append(optgroup);
                }
            }
        }
    };

    var highlightAddedAndRemoved = function () {
        var addedItems = this.addedItems;
        var removedItems = this.removedItems;
        $('.highlightProd').removeClass('highlightProd');
        if (addedItems) {
            for (var group in addedItems) {
                var list = addedItems[group];
                if (list && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        $('.rightArea optgroup[label="' + group + '"] option[value="' + list[i].id + '"]').addClass('highlightProd');
                    }
                }
            }
        }
        if (removedItems) {
            for (var group in removedItems) {
                var list = removedItems[group];
                if (list && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        $('.leftArea optgroup[label="' + group + '"] option[value="' + list[i].id + '"]').addClass('highlightProd');
                    }
                }
            }
        }
    };

    var moveItem = function (id, group, from, to) {
        var list, tobeAdded, tobeAddedArr, newGroup;

        for (var i = 0; i < from.length; i++) {

            if (from[i]['group'] === group) {
                list = from[i]['list'];
                tobeAdded = findItem(group, to, 'group');

                //if group exist in the list to be added
                if (!!tobeAdded) {
                    tobeAddedArr = tobeAdded['list'];
                } else {
                    newGroup = {
                        'group': group,
                        'list': []
                    };
                    to.push(newGroup);
                    tobeAddedArr = newGroup['list'];
                }
                addItem(id, list, tobeAddedArr);
                deleteItem(id, list);
            }
        }
    };

    var moveItems = function ($source) {
        $source.find("option:selected").each(function () {
            var group = this.getAttribute('category'),
            //avoid if the id is not a number string
                id = parseInt(this.value) || this.value;

            if ($source.attr('class') === 'left-area') {
                moveItem(id, group, unselectedData, selectedData);
            } else {
                moveItem(id, group, selectedData, unselectedData);
            }
        });

        leftArea.children().remove();
        rightArea.children().remove();

        drawOptions(unselectedData, includingStrategy, leftArea);

        drawOptions(selectedData, includingStrategy, rightArea);
    };

    var renderItems = function (unselectedData, selectedData, includingStrategy) {

        drawOptions(unselectedData, includingStrategy, leftArea);

        drawOptions(selectedData, includingStrategy, rightArea);

        //this.showHideOption();
        highlightAddedAndRemoved();
    };

    var renderLayout = function (placeholder) {

        var container = document.getElementById(placeholder),
            _leftArea = createSelect(),
            _rightArea = createSelect(),
            buttonArea = document.createElement('div'),
            addBtn = createBtn('Add>>'),
            addAllBtn = createBtn('Add All>>'),
            removeAllBtn = createBtn('<<Remove All'),
            removeBtn = createBtn('<<Remove');

        _leftArea.setAttribute("multiple", "multiple");
        _leftArea.setAttribute("class", "left-area");

        _rightArea.setAttribute("multiple", "multiple");
        _rightArea.setAttribute("class", "right-area");

        buttonArea.setAttribute('class', 'button-area');

        addBtn.setAttribute('id', 'addBtn');
        addAllBtn.setAttribute('id', 'addAllBtn');
        removeAllBtn.setAttribute('id', 'removeAllBtn');
        removeBtn.setAttribute('id', 'removeBtn');

        buttonArea.appendChild(addBtn);
        buttonArea.appendChild(addAllBtn);
        buttonArea.appendChild(removeAllBtn);
        buttonArea.appendChild(removeBtn);

        container.setAttribute('class', 'selector-container');

        container.appendChild(_leftArea);

        container.appendChild(buttonArea);

        container.appendChild(_rightArea);

        leftArea = $('.left-area');
        rightArea = $('.right-area');

    };

    var bindEvents = function () {
        var leftArea = $('.left-area');
        var rightArea = $('.right-area');

        leftArea.dblclick(function () {
            moveItems($(this));
        });

        rightArea.dblclick(function () {
            moveItems($(this));
        });

        $('#addBtn').click(function () {
            moveItems(leftArea);
        });

        $('#removeBtn').click(function () {
            moveItems(rightArea);
        });

        $('#addAllBtn').click(function () {
            leftArea.find("option").prop("selected", "selected");
            moveItems(leftArea);
        });

        $('#removeAllBtn').click(function () {
            rightArea.find("option").prop("selected", "selected");
            moveItems(rightArea);
        });

    };

    return F;
})();
