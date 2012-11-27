define(["jQuery", "kendo", "config", "utils", "data", "cart", "templates", "albums"], function ($, kendo, config, utils, data, cart, templates, albums) {
    var _viewElement,
        
        _buildSearchFilter = function (term) {
            return {
                logic: "or",
                filters: [
                    {field: "Title", operator: "contains", value: term},
                    {field: "Artist.Name", operator: "contains", value: term}
                ]
            };
        },

        submitSearch = function (e) {
            var filter;

            utils.scrollViewToTop(_viewElement);
            
            filter = _buildSearchFilter(_viewElement.find(".search-text").val());
            data.searchList.filter(filter);
        },
        
        show = function (showEvent) {
            var resultsListView = showEvent.view.element.find(".km-listview").data("kendoMobileListView");
            if(resultsListView) {
                resultsListView.refresh();
            }
        };

    return {
        init: function (initEvent) {
            _viewElement = initEvent.sender.element;
            _viewElement.find(".search-text").change(submitSearch);
        },

        show: show,

        viewModel: kendo.observable($.extend({
            results: data.searchList,
            submitSearch: submitSearch,
        }, albums.baseAlbumViewModel))
    }
});