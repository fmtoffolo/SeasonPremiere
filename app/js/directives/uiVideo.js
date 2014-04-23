app.directive('uivideo', function($sce, $compile, torrentData) {
    var vp; // video player object to overcome one of the angularjs issues in #1352 (https://github.com/angular/angular.js/issues/1352). when the videojs player is removed from the dom, the player object is not destroyed and can't be reused.
    //var videoId = Math.floor((Math.random() * 1000) + 100); // in random we trust. you can use a hash of the video uri

    return {
        restrict: 'E',
        template: '<div class="video">' + ' <video ng-src="{{href}}" id="videoShow" class="video-js vjs-default-skin vjs-big-play-centered" controls>' +
            '<source  type="video/mp4"> ' + /* seems not yet supported in angular */
            'Your browser does not support the video tag.{{trackURL}}' + '</video></div>',
        link: function(scope, element, attrs) {
            //scope.properties = 'whatever url';
            if (vp) vp.dispose();
            scope.$watch('port', function(value) {
                scope.href = $sce.trustAsResourceUrl('http://127.0.0.1:' + value);
                console.log(scope.href);

            });



            // scope.$watch('track', function(value) {
            //     scope.trackURL = $sce.trustAsResourceUrl('http://dl.opensubtitles.org/en/download/filead/src-api/' + value);
            //     console.log('en teoria deberia tener la url de la track pero no seee');
            // });
            var tracks = torrentData.getTorrentData().subtitles;

            vp = videojs('videoShow', {
                width: '100%',
                height: '100%',
                nativeControlsForTouch: false,
                preload: 'auto',
                autoplay: false
            });

            var tempTracks = [];

            for (var i = 0; i < tracks.length; i++) {
                // var a = tracks[i].srtURL;
                // var position = tracks[i].srtURL.indexOf('download/');
                // var b = 'subencoding-utf8/';
                // var output = [a.slice(0, position), b, a.slice(position)].join('');

                var track = {
                    kind: 'subtitles',
                    srclang: tracks[i].ISO639,
                    'default': 'default',
                    src: tracks[i].srtURL,
                    label: tracks[i].language
                };
                tempTracks.push(track);
            };

            console.log(tempTracks);
            vp.addTextTracks(tempTracks);

            //Sconsole.log(test);
            //videojs('videoShow').TextTrack[1].activate();


            vp.on('loadstart', function(data) {
                console.log('started loading data');
            });

            vp.on('loadeddata', function(data) {
                console.log('loadeddata');
                console.log(data);
                scope.readyToPlay = true;
                scope.$apply();
                $('.vjs-subtitles-button').show();
                for (var i = 0; i < videojs('videoShow').textTracks_.length; i++) {

                    $('.vjs-menu-content').append('<li class="vjs-menu-item" role="button" aria-live="polite" tabindex="0" aria-selected="true">' + videojs('videoShow').textTracks_[i].label_ + '</li>');
                };

                $('.vjs-menu-item').on('click', function() {
                    var track = this.innerHTML;
                    var this_ = this;
                    for (var i = 0; i < videojs('videoShow').textTracks_.length; i++) {
                        if (videojs('videoShow').textTracks_[i].label_ === track) {
                            if ($(this_).hasClass('vjs-selected')) {
                                videojs('videoShow').textTracks_[i].hide();
                                $('.vjs-selected').removeClass('vjs-selected');
                            } else {
                                for (var x = 0; x < videojs('videoShow').textTracks_.length; x++) {
                                    if ($('.vjs-selected').html() === videojs('videoShow').textTracks_[x].label_) {
                                        videojs('videoShow').textTracks_[x].hide();
                                        break;
                                    }
                                }

                                $('.vjs-selected').removeClass('vjs-selected');
                                $(this_).addClass('vjs-selected');
                                console.log(track);
                                videojs('videoShow').textTracks_[i].show();

                            }
                        }
                    }
                });

                $('.vjs-fullscreen-control').on('click', function() {
                    if (win.isFullscreen) {
                        win.leaveFullscreen();
                        win.focus();
                    } else {
                        win.enterFullscreen();
                        win.focus();
                    }
                });
                //videojs('videoShow').textTracks_[videojs('videoShow').textTracks_.length - 1].show();

            });
        }
    };
});