//get shows aired during the last 30 days...could do one multipurpose factory to use everytime I need an api call....but blah
var apiKey = '26e9af302a01da0a2bd9167b24779cc5',
    baseURL = 'http://api.trakt.tv/';

app.factory('airedLastMonth', function($resource) {

    var url = baseURL + 'calendar/shows.json/:apiKey/:date/';

    var date = new Date().add({
        days: -7
    }).toString('yyyyMMdd');

    return $resource(url, {}, {
        get: {
            method: 'GET',
            params: {
                apiKey: apiKey,
                date: date
                //days: 3
            },
            isArray: true
        }
    });

});

//Get popular shows so as to limit exposure and make sure they have torrents...or at least try
app.factory('trendingShows', function($resource) {

    var url = baseURL + 'shows/trending.json/:apiKey';


    return $resource(url, {}, {
        get: {
            method: 'GET',
            params: {
                apiKey: apiKey,
            },
            isArray: true
        }
    });

});

//get a list of show's episodes for the current season
app.factory('getShowEpisodes', function($resource) {

    var url = baseURL + 'show/season.json/:apiKey/:showID/:season';

    return $resource(url, {}, {
        get: {
            method: 'GET',
            params: {
                apiKey: apiKey,
                showID: '@showID',
                season: '@season'
            },
            isArray: true
        }
    });

});

//get show info to display small summary on the unique show's page
app.factory('getShowInfo', function($resource) {

    var url = baseURL + 'show/summary.json/:apiKey/:showID';

    return $resource(url, {}, {
        get: {
            method: 'GET',
            params: {
                apiKey: apiKey,
                showID: '@showID'
            },
            isArray: false
        }
    });

});