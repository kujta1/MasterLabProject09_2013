/**
 * Created by D Mak on 23.02.14.
 */



App.filter('filterVideoByDate', function ($filter) {
    return function (items) {
        var matchedVideos = [];
        angular.forEach(items, function (item) {
            if (new Date(item.uploadDate).getTime() == date.getTime()) {
                matchedVideos.push(item);
            }
        });
        return matchedVideos;
    }
})



var MY_NOTES = 1;
var ALL_NOTES = 2;
var showNotes = ALL_NOTES;
var MY_VIDEOS = 1;
var ALL_VIDEOS = 2;
var showVideos = ALL_VIDEOS;
var date = new Date();

$("#select-videos").click(function () {
    $(".select-videos-item").show();
    $(".select-notes-item").hide();
})

$("#select-notes").click(function () {
    $(".select-notes-item").show();
    $(".select-videos-item").hide();
})
