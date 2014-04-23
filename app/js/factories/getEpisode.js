app.factory('episodeData', function() {
    var episodeData = {};

    return {
        getEpisodeData: function() {
            return episodeData;
        },
        setEpisodeData: function(value) {
            episodeData = value;
        }
    }
});