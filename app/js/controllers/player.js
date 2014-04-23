app.controller('player', function($scope, $sce, torrentData, $compile, $sce, $location) {
    $scope.torrentData = torrentData.getTorrentData().torrentData;
    console.log($scope.torrentData);
    $scope.buffer = true;
    $scope.readyToPlay = false;
    $scope.track = torrentData.getTorrentData().track;


    var engine = null;

    var playShow = function(torrent) {
        var file = 'file' + Math.random() + '.mp4';
        var fileName = path.join(tmpFolder, file);
        console.log(torrent);

        var engine = peerflix(torrent, {
            connections: 100,
            path: fileName,
            tracker: true,
            buffer: (1.5 * 1024 * 1024).toString()
        });

        var hotswaps = 0;
        var progress;


        engine.on('hotswap', function() {
            hotswaps++;
        });

        var started = Date.now();
        var wires = engine.swarm.wires;
        var swarm = engine.swarm;

        var active = function(wire) {
            return !wire.peerChoking;
        };

        engine.server.on('listening', function() {
            console.log('listening etc');
            console.log(engine);
            console.log(engine.server.address().port);

            var waitBuffer = function() {
                if (swarm.downloaded > engine.torrent.length * 0.07) {
                    clearTimeout(waitBufferTimeOut);
                    $scope.$apply(function() {
                        $scope.port = engine.server.address().port;
                    });
                    console.log('listen on http://127.0.0.1:' + engine.server.address().port + '/');
                } else {
                    var waitBufferTimeOut = setTimeout(waitBuffer, 7000);
                }
            }


            var checkLoading = function() { //change buffer so it waits till 10 or 15 mb are downloaded instead of a %. seems to be the minimuum to stream

                //console.log((show.downloaded / 1024).toFixed(2) + '/' + (show.selected.length / 1024).toFixed(2) + ' ' + ((show.downloaded / show.selected.length) * 100).toFixed(2) + '%');
                progress = ((swarm.downloaded / engine.torrent.length) * 100).toFixed(2);
                $scope.connectedPeers = swarm.wires.length;
                $scope.progress = progress * 10;
                $scope.speed = (swarm.downloadSpeed() / 1024).toFixed(2);

                //console.log(progress);
                if ($scope.readyToPlay || swarm.downloaded > engine.torrent.length * 0.10) {
                    $scope.buffer = false;
                    console.log('downloaded 20% buffer');
                    $scope.$apply();
                    clearTimeout(timeout);
                } else {
                    $scope.$apply();
                    var timeout = setTimeout(checkLoading, 500);
                }
            }
            waitBuffer();
            checkLoading();

            $('.goBack').on('click', function(elem) {
                console.log('destroy download:');

                //show.clearCache();
                engine.destroy(function() {
                    console.log(engine);
                    console.log('got here ' + engine);
                    $location.path('show');
                    $scope.$apply();
                });
            });



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


    };





    // var playShow = function(torrent) {

    //     var file = 'file' + Math.random() + '.mp4';
    //     var fileName = path.join(tmpFolder, file);

    //     showEngine = peerflix(torrent, {
    //         connections: 100,
    //         path: fileName,
    //         tracker: true,
    //         buffer: (1.5 * 1024 * 1024).toString()
    //     }, function(err, show) {
    //         if (err) {
    //             console.log(err);
    //             showEngine = null;
    //             $location.path('show');
    //             $scope.$apply();
    //             //window.history.back();
    //         } else {
    //             var timeout;
    //             var hotswaps = 0;
    //             console.log('show');
    //             console.log(show);

    //             // show.on('ready', function(v) {
    //             //     console.log(v);
    //             // });

    //             // show.on('uninterested', function() {
    //             //     show.swarm.pause();
    //             //     console.log('uninterested');
    //             // });

    //             // show.on('interested', function() {
    //             //     show.swarm.resume();
    //             // });

    //             // show.on('hotswap', function() {
    //             //     hotswaps++;
    //             // });


    //             show.server.on('listening', function() {
    //                 // $scope.$apply(function() {
    //                 //     $scope.port = show.server.address().port;
    //                 //     //$('.viewContainer').append($compile('<uivideo/>')($scope));

    //                 // });
    //                 // console.log('listen on http://127.0.0.1:' + show.server.address().port + '/');

    //                 var waitBuffer = function() {
    //                     if (show.downloaded > show.selected.length * 0.07) {
    //                         clearTimeout(waitBufferTimeOut);
    //                         $scope.$apply(function() {
    //                             $scope.port = show.server.address().port;
    //                             //$('.viewContainer').append($compile('<uivideo/>')($scope));

    //                         });
    //                         console.log('listen on http://127.0.0.1:' + show.server.address().port + '/');
    //                     } else {
    //                         var waitBufferTimeOut = setTimeout(waitBuffer, 7000);
    //                     }
    //                 }
    //                 waitBuffer();


    //                 //check loading to buffer a
    //                 var checkLoading = function() { //change buffer so it waits till 10 or 15 mb are downloaded instead of a %. seems to be the minimuum to stream
    //                     if (show) {
    //                         //console.log((show.downloaded / 1024).toFixed(2) + '/' + (show.selected.length / 1024).toFixed(2) + ' ' + ((show.downloaded / show.selected.length) * 100).toFixed(2) + '%');
    //                         var progress = ((show.downloaded / show.selected.length) * 100).toFixed(2);
    //                         $scope.connectedPeers = show.peers.length;
    //                         $scope.progress = progress * 5;
    //                         $scope.speed = (show.speed() / 1024).toFixed(2);
    //                         //console.log(show);
    //                         //videojs('videoShow').options_.preload



    //                         if ($scope.readyToPlay || show.downloaded > show.selected.length * 0.20) {
    //                             $scope.buffer = false;
    //                             console.log('downloaded 10% buffer');
    //                             $scope.$apply();
    //                             clearTimeout(timeout);
    //                         } else {

    //                             $scope.$apply();
    //                             timeout = setTimeout(checkLoading, 500);
    //                         }

    //                     }

    //                 }
    //                 checkLoading();

    //                 $('.vjs-fullscreen-control').on('click', function() {
    //                     if (win.isFullscreen) {
    //                         win.leaveFullscreen();
    //                         win.focus();
    //                     } else {
    //                         win.enterFullscreen();
    //                         win.focus();
    //                     }
    //                 });

    //                 $('.resize').on('click', function() {
    //                     if (win.isFullscreen) {
    //                         win.leaveFullscreen();
    //                         win.focus();
    //                     } else {
    //                         win.enterFullscreen();
    //                         win.focus();
    //                     }
    //                 });


    //                 $('.goBack').on('click', function(elem) {
    //                     console.log('destroy download:');
    //                     console.log(showEngine);
    //                     if (timeout) {
    //                         clearTimeout(timeout);
    //                     }
    //                     show.clearCache();
    //                     show.destroy();
    //                     showEngine = null;
    //                     delete show;
    //                     console.log(show);
    //                     console.log('got here ' + showEngine);
    //                     $location.path('show');
    //                     $scope.$apply();
    //                     //window.history.back();
    //                 });
    //             });
    //         }
    //     });



    // }

    playShow($scope.torrentData.magnetURI);




});