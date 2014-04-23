app.controller('episode', function($scope, $http, $location, selectedShow, getShowEpisodes, getShowInfo, indexCache, episodeData, torrentData) {
    $scope.episodeData = episodeData.getEpisodeData();
    $scope.episodeData.showName = selectedShow.getShowData().name;
    $scope.dataOK = false;
    torrentData.deleteTorrentData();

    console.log($scope.episodeData);

    showsearcher({
        name: $scope.episodeData.showName,
        season: $scope.episodeData.season,
        episode: $scope.episodeData.episode,
        quality: 'HDTV'
    })
        .then(function(finalData) {
            console.log(finalData);
            console.log('fernando');
            $scope.$apply(function() {
                $scope.dataOK = true;
                $scope.subtitleData = finalData.subtitles;
            });

            torrentData.setTorrentData(finalData);
        })
        .
    catch (function(error) {
        console.log('something went wrong');
    });

    // //function to call when "play me"
    // //is clicked.this opens a new view which starts downloading the file and loads the player when buffer reaches 15 %
    $scope.playTorrent = function() { //
        console.log('calling view player');


        $location.path('player');

    }

    // loadTorrents($scope.episodeData.showName, $scope.episodeData.season, $scope.episodeData.episode, 'HDTV');



});