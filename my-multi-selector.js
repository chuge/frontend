var twoSideSelector = (function () {

    var rawUnselectedData, rawSelectedData;

    var leftArea, rightArea, unselectedData, selectedData, allData, includingStrategy, callback;

    var leftAreaClass = 'left-area', rightAreaClass = 'right-area';

    var addedItems, removedItems;

    function F(placeholder, opts) {

        reset(placeholder);

        init(opts);

        rawSelectedData = buildSelectedData(selectedData, removedItems, addedItems);

        rawUnselectedData = calUnselectedData(allData, rawSelectedData);

        unselectedData = calUnselectedData(allData, selectedData);

        render(placeholder, unselectedData, selectedData, includingStrategy);

        bindEvents();
    }

    var init = function (opts) {
        selectedData = opts.selectedData;
        allData = opts.allData;
        includingStrategy = opts.includingStrategy;
        callback = opts.callback;

        //This codes is used for recovery selector when page reload.
        addedItems = opts.addedItems || {};
        removedItems = opts.removedItems || {};
    };

    var removeAddedFromRawSelected = function (rawSelectedData, addedItems) {
        var arr, currentRawArr;
        for (var groupName in addedItems) {
            if (!addedItems.hasOwnProperty(groupName)) {
                continue;
            }
            arr = addedItems[groupName];
            for (var i = 0, length = arr.length; i < length; i++) {
                currentRawArr = findItem(groupName, rawSelectedData, 'group')['list'];
                deleteItem(arr[i]['id'], currentRawArr);
            }
        }
    };

    var buildSelectedData = function (selectedData, removedItems, addedItems) {
        var arr, currentAllArr, item,
            rawSelectedData = deepCopy(selectedData);
        //when init the page, the removedItems is [], but when user back the page, the removedItems is not null
        //handle case when user back to previous page will reload this component
        for (var groupName in removedItems) {
            if (!removedItems.hasOwnProperty(groupName)) {
                continue;
            }
            arr = removedItems[groupName];
            for (var i = 0, length = arr.length; i < length; i++) {
                currentAllArr = findItem(groupName, allData, 'group')['list'];
                item = deepCopy(findItem(arr[i]['id'], currentAllArr));
                pushIntoRawData(item, groupName, rawSelectedData);
            }
        }
        removeAddedFromRawSelected(rawSelectedData, addedItems);

        return rawSelectedData;
    };

    var pushIntoRawData = function (item, groupName, rawData) {
        var tempArr = [], tempObj = {}, groupObj = findItem(groupName, rawData, 'group');
        if (!groupObj) {
            tempArr.push(item);
            tempObj = {
                group: groupName,
                list: tempArr
            };
            rawData.push(tempObj);
        } else {
            groupObj['list'].push(item);
        }
    };

    var reset = function (placeholder) {
        $('#' + placeholder).empty();
    };

    var deepCopy = function (o) {
        var copy = o, k;

        if (o && typeof o === 'object') {
            copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
            for (k in o) {
                if (o.hasOwnProperty(k)) {
                    copy[k] = deepCopy(o[k]);
                }
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

    var render = function (placeholder, unselectedData, selectedData, includingStrategy) {
        renderLayout(placeholder);

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

    var addItem = function (id, list, _tobeAdded) {
        var item = findItem(id, list),
            tobeAdded = _tobeAdded || list;
        if (!item) {
            return;
        }
        tobeAdded.push(item);
    };

    var calUnselectedData = function (allData, selectedData) {
        var unselectedData = deepCopy(allData);

        if (!selectedData) {
            return;
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

    var drawOptions = function (data, placeholder, includingStrategy) {
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
        $('.highlight').removeClass('highlight');
        if (addedItems) {
            for (var group in addedItems) {
                var list = addedItems[group];
                if (list && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        $('.' + rightAreaClass + ' optgroup[label="' + group + '"] option[value="' + list[i].id + '"]').addClass('highlight');
                    }
                }
            }
        }
        if (removedItems) {
            for (group in removedItems) {
                list = removedItems[group];
                if (list && list.length > 0) {
                    for (i = 0; i < list.length; i++) {
                        $('.' + leftAreaClass + ' optgroup[label="' + group + '"] option[value="' + list[i].id + '"]').addClass('highlight');
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
            var $this = $(this), group = $this.attr('category'),
            //avoid if the id is not a number string
                id = parseInt($this.val()) || $this.val(),
                name = $this.attr('title'),
                item = {
                    id: id,
                    name: name,
                    group: group
                };

            if ($source.attr('class') === leftAreaClass) {
                //left to right
                addAddedItems(item);

                removeDeletedItems(item);

                moveItem(id, group, unselectedData, selectedData);
            } else {
                //right to left
                removeAddedItems(item);

                addDeletedItems(item);

                moveItem(id, group, selectedData, unselectedData);
            }
        });

        leftArea.children().remove();
        rightArea.children().remove();

        renderItems(unselectedData, selectedData, includingStrategy);

        if (!!callback) {
            callback(addedItems);
        }
    };

    var addChangedItems = function (item, items) {
        if (findIndex(item.id, items) === -1) {
            items.push(item);
        }
    };

    var removeChangedItems = function (item, items) {
        deleteItem(item.id, items);
    };

    var addAddedItems = function (item) {
        var list;

        if (findIndexInRawData(item, rawUnselectedData) === -1) {
            return;
        }

        list = addedItems[item['group']];

        if (!list) {
            list = addedItems[item['group']] = [];
        }

        addChangedItems(item, list);
    };

    var removeAddedItems = function (item) {
        var list = addedItems[item['group']];
        if (!list) {
            return;
        }

        if (findIndexInRawData(item, rawUnselectedData) !== -1) {
            removeChangedItems(item, list);
        }
        //remove list if there no elements in it
        if (list.length === 0) {
            delete addedItems[item['group']];
        }
    };

    var addDeletedItems = function (item) {
        var list;

        if (findIndexInRawData(item, rawSelectedData) === -1) {
            return;
        }

        list = removedItems[item['group']];

        if (!list) {
            list = removedItems[item['group']] = [];
        }

        addChangedItems(item, list);
    };

    var removeDeletedItems = function (item) {
        var list = removedItems[item['group']];
        if (!list) {
            return;
        }

        if (findIndexInRawData(item, rawSelectedData) !== -1) {
            removeChangedItems(item, list);
        }

        //remove list if there no elements in it
        if (list.length === 0) {
            delete removedItems[item['group']];
        }
    };

    var findIndexInRawData = function (item, rawData) {

        var GROUP = 'group', group = findItem(item[GROUP], rawData, GROUP);

        if (!group) {
            return -1;
        }

        return findIndex(item['id'], group['list']);
    };

    var renderItems = function (unselectedData, selectedData, includingStrategy) {

        drawOptions(unselectedData, leftArea, includingStrategy);

        drawOptions(selectedData, rightArea, includingStrategy);

        highlightAddedAndRemoved();
    };

    var renderLayout = function (placeholder) {

        var container = document.getElementById(placeholder),
            _leftArea = createSelect(),
            _rightArea = createSelect(),
            toolArea = document.createElement('div'),
            legendAddedArea = document.createElement('div'),
            legendRemovedArea = document.createElement('div'),
            textAdded = document.createTextNode('Added'),
            textRemoved = document.createTextNode('Removed'),
            spanAdded = document.createElement('span'),
            spanRemoved = document.createElement('span'),
            addBtn = createBtn('Add>>'),
            addAllBtn = createBtn('Add All>>'),
            removeAllBtn = createBtn('<<Remove All'),
            removeBtn = createBtn('<<Remove');

        _leftArea.setAttribute("multiple", "multiple");
        _leftArea.setAttribute("class", leftAreaClass);

        _rightArea.setAttribute("multiple", "multiple");
        _rightArea.setAttribute("class", rightAreaClass);

        toolArea.setAttribute('class', 'tool-area');

        addBtn.setAttribute('id', 'addBtn');
        addAllBtn.setAttribute('id', 'addAllBtn');
        removeAllBtn.setAttribute('id', 'removeAllBtn');
        removeBtn.setAttribute('id', 'removeBtn');

        spanAdded.setAttribute('class', 'added');
        spanRemoved.setAttribute('class', 'removed');

        legendAddedArea.appendChild(spanAdded);
        legendRemovedArea.appendChild(spanRemoved);

        legendAddedArea.appendChild(textAdded);
        legendRemovedArea.appendChild(textRemoved);

        legendAddedArea.setAttribute('class', 'legend');
        legendRemovedArea.setAttribute('class', 'legend');

        toolArea.appendChild(addBtn);
        toolArea.appendChild(addAllBtn);
        toolArea.appendChild(removeAllBtn);
        toolArea.appendChild(removeBtn);

        toolArea.appendChild(legendAddedArea);
        toolArea.appendChild(legendRemovedArea);

        container.setAttribute('class', 'selector-container');

        container.appendChild(_leftArea);

        container.appendChild(toolArea);

        container.appendChild(_rightArea);

        leftArea = $('.' + leftAreaClass);
        rightArea = $('.' + rightAreaClass);

    };

    var bindEvents = function () {
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

    F.prototype.getAddedData = function () {
        return addedItems;
    };

    F.prototype.getRemovedData = function () {
        return removedItems;
    };

    return F;
})();
