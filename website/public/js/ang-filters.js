/**
 * Created by D Mak on 23.02.14.
 */




App.controller('AppController', function ($scope, $filter) {



    $("#my-videos").click(function () {
        if (showVideos == ALL_VIDEOS) {
            showVideos = MY_VIDEOS;
            $scope.videos = $filter('filterVideoByOwner')($scope.videos);
            $scope.$apply();
            $("#my-videos").addClass("active");
            $("#my-notes").removeClass("active");
            showNotes = ALL_NOTES;
            $("#my-videos").find("a").append('<i class="glyphicon glyphicon-ok"></i>');
            $("#my-notes").find("a>.glyphicon-ok").remove();
        }
        else {
            showVideos = ALL_VIDEOS;
            $scope.videos = $scope.backupVideos;
            $scope.$apply();
            $("#my-videos").removeClass("active");
            $("#my-videos").find("a>.glyphicon-ok").remove();
        }
    });

    $("#my-notes").click(function () {
        if (showNotes == ALL_NOTES) {
            showNotes = MY_NOTES;
            $scope.videos = $filter('filterNoteByOwner')($scope.videos);
            $scope.$apply();
            $("#my-notes").addClass("active");
            $("#my-videos").removeClass("active");
            showVideos = ALL_VIDEOS;
            $("#my-notes").find("a").append('<i class="glyphicon glyphicon-ok"></i>');
            $("#my-videos").find("a>.glyphicon-ok").remove();
        }
        else {
            showNotes = ALL_NOTES;
            $scope.videos = $scope.backupVideos;
            $scope.$apply();
            $("#my-notes").removeClass("active");
            $("#my-notes").find("a>.glyphicon-ok").remove();
        }
    })


    $('.datepicker').datepicker({
        autoclose: true,
        clearBtn: true
    }).on("changeDate",function (e) {
            date = new Date(e.date);
            if (e.format('dd.mm.yyyy')) $("#date").html(e.format('dd.mm.yyyy'));
            else $("#date").html("Date");
            if (date.getDate()) {
                $scope.videos = $filter('filterVideoByDate')($scope.backupVideos);
                $scope.$apply();
            }
        }).on("clearDate", function (e) {
            date = new Date();
            $scope.videos = $scope.backupVideos;
            $scope.$apply();
        })

});

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

App.filter('filterVideoByOwner', function ($filter) {
    return function (items) {
        var matchedVideos = [];
        angular.forEach(items, function (item) {
            if (showVideos == MY_VIDEOS) {
                if (item.owner.email == userEmail) {
                    matchedVideos.push(item);
                }
            } else {
                matchedVideos.push(item);
            }
        });
        return matchedVideos;
    }
})


App.filter('filterNoteByOwner', function ($filter) {

    return function (items) {
        var matchedVideos = [];
        angular.forEach(items, function (item) {
            var itemCopy = Object.create(item);
            itemCopy.notes = [];
            angular.forEach(item.notes, function (note) {
                if (showNotes == MY_NOTES) {
                    if (note.noteWriter.email == userEmail) {
                        itemCopy.notes.push(note);
                        if (matchedVideos.indexOf(itemCopy) < 0) matchedVideos.push(itemCopy);
                    }
                }
                else {
                    matchedVideos.push(item);
                }
            });
        })
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
