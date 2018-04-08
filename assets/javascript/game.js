var topics = ["Cinderella", "Mickey", "Minnie", "Daisy", "Donald"];
var imagescr;
var dataResponse;

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    buttons();
});
function displaytopics() {
    console.log(this);
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=1ow7bPsvAXT34olt4173SkeDRHJ0dR3l&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        dataResponse = response;
        $("#topics-view").empty();
        var htmlContent = "";
        for (i = 0; i < 10; i++) {
            //$("#topics-view").append(wrapper);
            //var topicdiv = $("<div class='topic"+i+"' id='pic"+i+"'>");
            //$("#topics-view").append(topicdiv); 
            imagescr = response.data[i].images.original_still.url;
            //var image = $('<img id=gifimage' + i + ' style="width:150px;height:150px;">').attr("src", imagescr);
            //topicdiv.append(image);
            //var rating = $("<p id='p"+i+"'>").text("Rating: " + response.data[i].rating);
            var content = '<figure><img id=gifimage' + i + ' style="width:200px;height:200px;margin:10px;" src="' + imagescr + '"><figcaption>Rating:' + response.data[i].rating + '</figcaption></figure>';
            // $("<div>").text("Rating: " + response.data[i].rating));
            // content.append(rating);
            //$("#pic"+i).html(content);                  
            htmlContent = htmlContent + content;
        }
        $("#topics-view").html(htmlContent);
    });
}

function buttons() {
    $("#topic-buttons").empty();
    for (i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#topic-buttons").append(a);
    }
    $("#topic-buttons").append("<br>");
}

$(document).on("click", ".topic-btn", displaytopics);
buttons();

/* $(document).on("click", ".topic-btn", empty);
   function empty(){
       var id = $(this).attr('id');
       var idnumber = id.substring(imgId.length-1,imgId.length);
       $("#gifimage"+idnumber).empty();
   }*/


$(document).on("click", "img", function () {
    console.log("src:" + $(this).attr('src') + ',id:' + $(this).attr('id'));
    var imgId = $(this).attr('id');
    var index = imgId.substring(imgId.length - 1, imgId.length);
    var imgSrc = $(this).attr('src');
    if (imgSrc.includes('preview')) {
        $(this).attr('src', dataResponse.data[index].images.original_still.url);
    } else {
        $(this).attr('src', dataResponse.data[index].images.preview_gif.url);
    }
});