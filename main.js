$.ajax({
    url: 'all-tokens.json',
    dataType: 'json',
    type: 'POST',
    async: false,
    cache: false,
    success: function (data) {
        if (!!data) {
            allProducts = data.results;
        }
        getUserTokens();
    },
    error: function () {
        console.log('error');
    }
});

function getUserTokens() {
    $.ajax({
        url: 'user-tokens.json',
        dataType: 'json',
        type: 'POST',
        async: true,
        cache: false,
        success: function (data) {
            if (!!data) {
                userProducts = data.results;
                if (allProducts) {
                    selector = new MultiSelector('Products', {
                        allData: allProducts,
                        selectedData: userProducts,
                        addedItems: {},
                        removedItems: {},
                        includingStrategy: true
                    });

                    new twoSideSelector('placeholder',
                        {
                            allData: allProducts,
                            selectedData: userProducts,
                            includingStrategy: true
                        });
                }
            }
        },
        error: function () {
            console.log('error');
        }
    });
}

