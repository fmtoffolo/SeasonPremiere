app.factory('torrentData', function() {
    var torrentData = {};

    return {
        getTorrentData: function() {
            return torrentData;
        },
        setTorrentData: function(value) {
            torrentData = value;
        },
        deleteTorrentData: function() {
            torrentData = false;
        }
    }
});