// can change names if you think it is confusing, not implemented yet.
// grabs array at index and loads into a card.

// Get Podcast from Dylan.
function ajaxStuff(inurl) {
    $.ajax({
        type: "GET",
        url: inurl,
        contentType: "application/json",
        error: (xhr, status) => {
            alert("Cannot Access Newest Data at this time. Please Try again later");
        },
        success: (podData) => {
            // First get podcast data
            console.log(podData);
            loadcards(podData);
        }
    });
}

function populateCardSimple(cardData, newCard, podName) {
    // title
    newCard.querySelector(".card-title").append(cardData.Title);

    // description
    newCard.querySelector(".card-abstract").append(cardData.Description);

    // doi
    newCard.querySelector(".card-doi").append(cardData.DOI);

    // likes
    newCard.querySelector(".bi-hand-thumbs-up").append(cardData.likes);
    // saves
    newCard.querySelector(".bi-bookmark").append(cardData.saves);
    // audio player
    newCard.querySelector(".card-audio").setAttribute("src", `/audio/${podName}.mp3`);
}

function populateCardLoops(cardData, newCard) {
    // disciplines
    let discHolder = newCard.querySelector(".card-disciplines");
    for (let i = 0; i < cardData.disciplines.length; i++) {
        // generate link to discipline pages
        let dElement = document.createElement("a");
        let dNode = document.createTextNode(cardData.disciplines[i]);
        // dElement.href=""
        dElement.appendChild(dNode);
        dElement.classList.add("text-decoration-none", "link-dark");

        if (i > 0) {
            discHolder.textContent += ", ";
        }

        discHolder.appendChild(dElement);
    }

    // authors
    let authHolder = newCard.querySelector(".card-authors");
    for (let i = 0; i < cardData.Authors.length; i++) {
        // author name
        if (i > 0) {
            authHolder.textContent += ", ";
        }

        authHolder.textContent += cardData.Authors[i].name;
    }

    // tags
    let templateTag = newCard.querySelector(".card-link");
    let tagHolder = newCard.querySelector(".card-tag-container");
    for (let i = 0; i < cardData.Tags.length; i++) {
        // clone the template node
        let newTag = templateTag.cloneNode(true);

        // reid the tag node
        newTag.removeAttribute("id");
        // unhide the tag node
        newTag.removeAttribute("hidden");

        // set card-tag content
        newTag.childNodes[0].textContent += cardData.Tags[i];

        // append to main tag holder
        tagHolder.appendChild(newTag);
    }
}

/**
 * 
 * @param {Array} cardData 
 * @param {HTMLElement} templateMan 
 * @param {HTMLElement} destination
 * @param {int} num 
 */
function loadcard(cardData, templateMan, destination, num, podName) {
    // clone template
    let newCardNode = templateMan.cloneNode(true);
    // unhide it
    newCardNode.setAttribute("id", `card-${num}`);
    newCardNode.removeAttribute("hidden");
    destination.appendChild(newCardNode);

    let newCard = destination.querySelector(`#card-${num}`);

    // populate the card
    populateCardSimple(cardData, newCard, podName);
    populateCardLoops(cardData, newCard);
    destination.append(newCard);
}

function loadcards(podList) {
    // Loads all cards
    let templateMan = document.getElementById("card-t");
    let desination = document.getElementById("cards-here");
    for (let i = 0; i < podList.length; i++) {
        $.ajax({
            type: "GET",
            url: `/api/pods/data/${podList[i]}`,
            contentType: "application/json",
            error: (xhr, status) => {
                console.log(xhr);
                console.log(status);
                //alert("Cannot Access Data at this time. Please Try again later");
            },
            success: (podData) => {
                // First get podcast data
                console.log(i);
                loadcard(podData, templateMan, desination, i, podList[i]);
            }
        });
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