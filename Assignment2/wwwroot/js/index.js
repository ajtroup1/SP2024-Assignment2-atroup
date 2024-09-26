var len;

var results = '';



function apiSearch() {
    let results = "";

    let q = $("#query").val();
    if (q == "" || !q) {
        alert("You must enter a value to search");
        return;
    }

    const params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "6c27922faefa4b4698679682f0575362");
        },
        type: "GET"
    })
        .done(function (data) {
            console.log(data);

            const len = data.webPages.value.length;
            for (let i = 0; i < len; i++) {
                results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
                results += `<div>`;

                if (data.images && data.images.value && data.images.value[i]) {
                    if (data.images.value[i].contentUrl) {
                        results += `<img src="${data.images.value[i].contentUrl}" alt="Image" class="search-img" />`; // Correct img tag syntax
                    }
                }

                results += `<p><a href='${data.webPages.value[i].url}'>${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                results += `</div>`;
            }

            $('#searchResults').html(results);

            $('#searchResults').dialog({
                height: 400,
                width: 600,
                modal: true,
                title: `Search Results`,
            });
        })
        .fail(function () {
            alert("Error occurred while fetching search results.");
        });
}


function backgroundImageChanger() {
    var element = document.body;
    var backgroundImage = window.getComputedStyle(element).backgroundImage;

    if (backgroundImage.includes('https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/seamless-repeating-background-tile-terryfic3d.jpg')) {
        document.body.style.backgroundImage = 'url("https://64.media.tumblr.com/162cc3dfa5cef6c882aba5453445f0fb/tumblr_mx3y1yYFad1qcm0eto1_1280.png")';
    } else {
        document.body.style.backgroundImage = 'url("https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/seamless-repeating-background-tile-terryfic3d.jpg")';
    }

    document.body.classList.add('background-animate');
}




function ChangeElementResultsVibility(elementName) {

    let visibilityCheck = document.getElementById(`${elementName}`).style.visibility

    if (visibilityCheck == 'hidden') {

        document.getElementById(`${elementName}`).style.visibility = 'visible'

    } else {

        document.getElementById(`${elementName}`).style.visibility = 'hidden'

    }

}



function QuerySearch() {

    ChangeElementResultsVibility("searchResults")

    apiSearch()

    document.getElementById("query").value = ''

    ChangeElementResultsVibility("searchResults")

}



// Function to update the textbox with the current time

function updateTimeTextBox() {
    const currentTimeString = new Date().toLocaleTimeString();
    $('#time').html(`<strong>The current time is:</strong> ${currentTimeString}`);

    $('#time').dialog({
        title: "Current Time",
        modal: true,
        width: 250, 
        height: 150,
        open: function (event, ui) {
        }
    });
}


function getLucky() {



    //Random between 1 and 5

    let randomChance = Math.floor(Math.random() * 5) + 1;



    if (randomChance === 3) {
        var audio = new Audio('../assets/vine-boom.mp3');
        audio.play();

        var fullscreenImage = document.getElementById('fullscreenImage');

        fullscreenImage.style.opacity = 1;

        var audio = new Audio('../assets/casino-win.mp3');
        audio.play();

        setTimeout(function () {
            fullscreenImage.style.opacity = 0;
        }, 2000);
    } else {
        var params = {

            "q": $("#query").val(),

            "count": "50",

            "offset": "0",

            "mkt": "en-us"

        };



        $.ajax({

            url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),

            beforeSend: function (xhrObj) {

                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "6c27922faefa4b4698679682f0575362");

            },

            type: "GET",

        })

            .done(function (data) {

                window.open(data.webPages.value[0].url, '_blank')

            })

            .fail(function () {

                alert("error");

            });

    }

}

window.getLucky = getLucky;