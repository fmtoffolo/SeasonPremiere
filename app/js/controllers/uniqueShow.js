app.controller('uniqueShow', function($scope, $http, $location, selectedShow, getShowEpisodes, getShowInfo, indexCache, torrentData, episodeData) {
    var showID = selectedShow.getShowData().id,
        season = selectedShow.getShowData().season,
        showFullData = indexCache.get(showID); //start cache

    $scope.dataOK = true;



    $scope.getEpisode = function(episode) {
        episodeData.setEpisodeData(episode);
        console.log(episodeData.getEpisodeData());

        $location.path('episode');


    }

    //checks if we have the show's data. if not, it goes ahead and get the summary and episodes. else it uses the cache
    if (!showFullData) {
        getShowInfo.get({
                showID: showID
            }, function(showInfo) {
                console.log(showInfo);
                showFullData = {
                    title: showInfo.title,
                    overview: showInfo.overview,
                    airDay: showInfo.air_day,
                    images: showInfo.images,
                    network: showInfo.network,
                    runtime: showInfo.runtime,
                    tvdb_id: showInfo.tvdb_id,
                    rating: showInfo.ratings.percentage,
                    season: season
                };
                getShowEpisodes.get({
                    showID: showID,
                    season: season
                }, function(seasonData) {
                    var d = new Date();
                    var today = Math.floor(d.getTime() / 1000);

                    //filter to only add episodes that have aired to the model
                    showFullData.episodes = [];
                    tempNextEpisode = [];
                    for (var i = 0; i < seasonData.length; i++) {
                        console.log(seasonData[i].first_aired_utc - today);
                        if ((seasonData[i].first_aired_utc - today) < 0 && seasonData[i].first_aired_utc !== 0) { // if older than today and aired date is set
                            var tmpEpisodeData = {
                                episode: seasonData[i].episode,
                                image: seasonData[i].screen,
                                overview: seasonData[i].overview,
                                title: seasonData[i].title,
                                tvdv_id: seasonData[i].tvdb_id,
                                season: seasonData[i].season,
                                airedDate: seasonData[i].first_aired_utc * 1000
                            };

                            showFullData.episodes.push(tmpEpisodeData); //add the whole episode data to the showfulldata object
                        } else if (seasonData[i].first_aired_utc !== 0) {
                            tempNextEpisode.push({
                                episode: seasonData[i].episode,
                                image: seasonData[i].screen,
                                overview: seasonData[i].overview,
                                title: seasonData[i].title,
                                tvdv_id: seasonData[i].tvdb_id,
                                season: seasonData[i].season,
                                airedDate: seasonData[i].first_aired_utc * 1000
                            });
                        }
                    };
                    tempNextEpisode.sort(function(a, b) {
                        return a.airedDate - b.airedDate;
                    });
                    console.log(tempNextEpisode);
                    if (tempNextEpisode.length > 0) {
                        showFullData.nextEpisode = tempNextEpisode[0].airedDate;
                    } else {
                        showFullData.nextEpisode = 0;
                    }
                    $scope.dataOK = true;
                    indexCache.put(showID, showFullData); //cache de model data
                    $scope.show = showFullData; //add show object to scope model
                    console.log($scope.show);

                }, function(err) {
                    $scope.dataOK = false;
                });
            },
            function(err) {
                $scope.dataOK = false;
            });
    } else {
        $scope.show = showFullData;
    }

    $('.resize').on('click', function() {
        if (win.isFullscreen) {
            win.leaveFullscreen();
            win.focus();
        } else {
            win.enterFullscreen();
            win.focus();
        }
    });
});