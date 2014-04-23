app.controller('listShows', function($scope, $cacheFactory, $location, trendingShows, airedLastMonth, indexCache, selectedShow) {

    //set filtered data to that cached
    var shows = indexCache.get('indexDataCache');
    $scope.dataOK = true;
    //redirect function to "show" view when poster is clicked using a service to pass the data.
    $scope.goToShow = function(name, id, season) {
        console.log('click works');
        selectedShow.setShowName(name);
        selectedShow.setShowId(id);
        selectedShow.setShowSeason(season);
        console.log('click works after setting variables');
        $location.path('show');
        console.log('click works to redirect?');
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

    //check to see if data is cached. If it is, skip the query.
    if (!shows) {
        trendingShows.get(function(trendingShowsList) {
            console.log(trendingShowsList);
            airedLastMonth.get(function(airedLastMonth) {
                console.log(airedLastMonth);
                //filter data to make sure we show popular American shows that aired in the last 30 days. (most likely to still have a lot of seeds)
                var firstPass = trendingShowsList.filter(function(element) {
                    for (var i = 0; i < airedLastMonth.length; i++) {
                        for (var x = 0; x < airedLastMonth[i].episodes.length; x++) {
                            if (element.title === airedLastMonth[i].episodes[x].show.title && element.title !== '') {
                                if (element.country === 'United States' || element.country === 'United Kingdom') {
                                    element.season = airedLastMonth[i].episodes[x].episode.season;
                                    element.lastAired = airedLastMonth[i].episodes[x].episode.first_aired_utc;
                                    return element.title;
                                };
                            };

                        };
                    };
                });

                var filtered = firstPass.filter(function(element) { //filter genres ...like talk shows, soaps and other kind.
                    for (var i = 0; i < element.genres.length; i++) {
                        if (element.genres.indexOf('Talk Show') < 0 && element.genres.indexOf('Soap') < 0) {
                            return element;
                        };
                    };
                });

                //create cleaner object array to add to the scope
                var shows = [];
                for (var i = 0; i < filtered.length; i++) {
                    var tmpShow = {
                        title: filtered[i].title,
                        tvdb_id: filtered[i].tvdb_id,
                        images: filtered[i].images,
                        season: filtered[i].season,
                        popularity: filtered[i].watchers,
                        air_day: filtered[i].air_day,
                        network: filtered[i].network,
                        lastAired: filtered[i].lastAired * 1000
                    };
                    shows.push(tmpShow);
                };

                //change poster url to use smaller image
                for (var i = 0; i < shows.length; i++) {
                    var tmpUrl = shows[i].images.poster.slice(0, (shows[i].images.poster.length - 4));
                    tmpUrl = tmpUrl + '-300.jpg';
                    shows[i].images.poster = tmpUrl;
                };



                indexCache.put('indexDataCache', shows); //cache data
                $scope.trendingShows = shows;
                $scope.dataOK = true;
                console.log('shows data:')
                console.log(shows);
            }, function(err) {
                console.log(err);
                $scope.dataOK = false;
            });
        }, function(err) {
            console.log(err);
            $scope.dataOK = false;
        });
    } else {
        $scope.dataOK = true;
        $scope.trendingShows = shows;
    }
});