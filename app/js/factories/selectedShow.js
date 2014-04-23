app.factory('selectedShow', function() {
    var selectedShow = {
        name: null,
        id: null,
        season: null
    };

    return {
        getShowData: function() {
            return selectedShow;
        },
        setShowName: function(value) {
            selectedShow.name = value;
        },
        setShowId: function(value) {
            selectedShow.id = value;
        },
        setShowSeason: function(value) {
            selectedShow.season = value;
        }
    }
});