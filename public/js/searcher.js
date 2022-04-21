function searchLoader() {
    // get the cards related to the search
    // Get Podcast
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
            //
            let cardData = podData;
            let searchTerms = getAllUrlParams().terms;
            // for each card
            // for each term

            // send the data to loadCard;

            loadcards(cardData);
        }
    });
}