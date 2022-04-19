// can change names if you think it is confusing, not implemented yet.
// grabs array at index and loads into a card.
// Get Podcast from Dylan.
function ajaxStuff() {
    $.ajax({
        type: "GET",
        url: "https://jsonblob.com/api/jsonBlob/952471299104718848",
        contentType: "application/json",
        error: (xhr, status) => {
            // if the request fails, this function executes.
            //      xhr is the request sent and some info about the error
            //      status is usually a small string describing the error

            // This bit will be different on each page, but is a good placeholder
            alert("Cannot Access Data at this time. Please Try again later");
        },
        success: (podData) => {
            // First get podcast data
            console.log(podData);
            loadcards(podData);
            /* will return an array of objects formatted like like this:
                [
                    {
                        "ID: : 1,
                        "DOI": "1234561234",
                        "fName": "Dylan",
                        "lName": "Gaines",
                        "email": "gainesd2@nku.edu",
                        "title": "This is a Test Article",
                        "journal": "The Test Journal",
                        "category": 0,
                        "tags": ["Test", "Zamn", "Cool Kids"],
                        "filePlaceHolder": "File Man",
                        "ratings": [[0, 5], [1,4]]
                    }
                ]
            */
        }
    });
}
//Quentin
function loadcard(aarray) {
    //* top part of card
    //Sets up outer most div.
    var div_card = document.createElement('div');
    div_card.classList = "card align-self-center pt-2 my-3 mx-0 px-0";

    //Sets up div body.
    var div_body = document.createElement('div');
    div_body.classList.add("card-body");

    //Sets up title of podcast.
    var title = document.createElement('h4');
    title.classList = "px-2 card-title";

    //Sets up names of authors. 
    var pname = document.createElement('div');
    pname.classList = "fs-6 px-2 card-text";

    //Sets up journal name.
    var journal = document.createElement('div');
    journal.classList = "fs-6 px-2 card-text";

    //Sets up doi div.
    var doi = document.createElement('div');
    doi.classList = "fs-6 px-2 card-text";

    //Sets up publication date div.
    var publication = document.createElement('div');
    publication.classList = "fs-6 px-2 card-text";

    //* bottom part of card
    //Sets up div for play button.
    var div_black = document.createElement('div');
    div_black.classList = "bg-black px-4 py-2 m-0 container-fluid";

    let div_info_and_play = document.createElement("div")
    div_info_and_play.classList = "p-0 m-0 d-flex flex-row mb-2";

    // sets up div for info.
    var div_info = document.createElement('div');
    div_info.classList = "info ms-3";

    //Sets up play button.
    var btnplay = document.createElement('button');
    btnplay.classList = ("bi bi-play-fill fs-3 btn p-0 px-2 text-white");

    //Sets up span to hold the title of the podcast.
    var spantitle = document.createElement('span');
    spantitle.classList = ("text-white p-0 my-card-title");

    //Adds text to span.
    spantitle.textContent = aarray.title;

    //Makes smalls that hold the date and authors.
    let small1 = document.createElement('div');
    let smallText1 = document.createElement('small');
    let small2 = document.createElement('div');
    let smallText2 = document.createElement('small');
    smallText1.classList = "text-secondary p-0 m-0";
    smallText2.classList = "text-secondary p-0 m-0";
    small1.appendChild(smallText1)
    small2.appendChild(smallText2)
    small1.classList = "text-secondary p-0 m-0";
    small2.classList = "text-secondary p-0 m-0";

    //white block taht holds time.
    hrthing = document.createElement('hr');

    //small that holds a fake timer
    var smalltime = document.createElement('small');
    smalltime.classList = "text-secondary mt-0 pt-0";
    hrthing.classList = "bg-white my-0";
    smalltime.textContent = "0:00/20:00";

    //sets text content.
    smallText1.textContent = aarray.publishers;
    smallText2.textContent = aarray.pubDate;
    pname.textContent = aarray.publishers;
    journal.textContent = aarray.journal;
    publication.textContent = aarray.pubDate;
    doi.textContent = aarray.DOI;
    title.textContent = aarray.title;
    //Appends everything.
    div_body.append(title, pname, journal, publication, doi);
    div_info.append(spantitle, small1, small2);
    div_info_and_play.append(btnplay, div_info);
    div_black.append(div_info_and_play, hrthing, smalltime);
    div_card.append(div_body, div_black);

    // should put in the right place in the document.
    var put = document.getElementById('cards-here');
    put.append(div_card);
}

function loadcards(array) {
    // Loads all cards
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
        loadcard(array[i]);
    }
}
/*
Dylans card template

<div id="templateCard" class="card align-self-center pt-2" hidden>
            <div class="card-body">
                <h4 id="titleMan" class="px-2 card-title">Test Title</h4>
                <div id="authors" class="fs-6 px-2 card-text">Sanders,gj, boos b, rhodes</div>
                <div id="journal" class="fs-6 px-2 card-text">test journal</div>
                <div id="year" class="fs-6 px-2 card-text">2018</div>
                <div id="doi" class="fs-6 px-2 card-text">132571435487</div>
            </div>
            <div class="bg-black px-4 pt-2">
                <div class="info">
                    <button id="playBoy" class="bi bi-play-fill btn p-0 text-white"></button>
                    <span id="titleBoy" class="text-white ps-2">Test Title</span>
                    <small id="authBoy" class="text-secondary">Sanders,gj, boos b, rhodes</small>
                    <small id="yearBoy" class="text-secondary">(2018)</small>
                </div>
                <!--fake timer-->
                <small id="timeBoy" class="text-secondary">0:00/20:00</small>
                <!--fake play bar-->
                <hr class="bg-white mt-0">
            </div>
        </div>
*/