app.directive('getdata', function($sce, $compile, episodeData) {

    return {
        restrict: 'E',
        template: '<div>teesting</div>',
        link: function(scope, element, attrs) {
            console.log('firsttttttt');
            showsearcher({
                name: scope.episodeData.showName,
                season: scope.episodeData.season,
                episode: scope.episodeData.episode,
                quality: 'HDTV'
            })
                .then(function(finalData) {
                    console.log(finalData);
                    console.log('fernando');
                })
                .
            catch (function(error) {
                console.log('something went wrong');
            });

        }
    };
});