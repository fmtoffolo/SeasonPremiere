app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/show', {
            templateUrl: '../views/show.html',
            controller: 'uniqueShow'
        }).
        when('/episode', {
            templateUrl: '../views/episode.html',
            controller: 'episode'
        }).
        when('/listShows', {
            templateUrl: '../views/listShows.html',
            controller: 'listShows'
        }).
        when('/player/', {
            templateUrl: '../views/player.html',
            controller: 'player'
        }).
        otherwise({
            redirectTo: '/listShows'
        });
    }
]);