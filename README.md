SeasonPremiere
==============

A TV show streamer using some APIs and peerflix. It is just a hobby and proof of concept.
It still needs lots of work.

##The app uses
 - Peerflix
 - Opensubtitles-client to get subtitles from Open Subtitles
 - ShowSearcher to get torrent data from Kickass.
 - Trakt.tv api to get shows data.
 - Various libraries like date.js, videoJS, jQuery.
 - Inspired by popcorn time, and used some of its code mostly for the subtitles encoding. But in the end I forced the encoding directly from opensubtitles so not much was used. I did used the already built nodewebkit distributions to have h264 support.
 
 
##How does it work?
 
The app displays the shows which had a new episode during the previous week. You then go to the show's view and select which episode you want to watch (last season only).
After that you go to the episode view where you can finally play the episode.
 
##Build it
To build you need to install the dependencies of the package.json files and then run


    grunt dist-win --force
     

I force it because jslint throws lots of errors. Mostly spaces...

##Use it
If you just want to check it out, you can download it from here:
[HERE](https://drive.google.com/file/d/0B3UCa-XuXdbsS29SVkNCR2xCNTg/edit?usp=sharing)

 
 
