function profiler() { // get the data
        let urlParams = getAllUrlParams();
        if (sessionStorage.getItem("ID") == urlParams.id) {
            let editBtn = document.createElement("a");
            editBtn.classList.add("btn", "btn-sm", "btn-outline-dark", "my-2", "bi", "bi-pen");
            //editBtn.href = `/account/details`;
            editBtn.innerHTML += " Edit your info";
            profileStuff.appendChild(editBtn);
            editBtn.addEventListener("click", () => {
                alert("not implemented yet");
            })
        }
    }
    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);
    const name = getLastItem(window.location.href);

    $.ajax({
        type: "GET",
        url: "/api/users/"+name,
        contentType: "application/json",
        error: (xhr, status) => {
            // if the request fails, this function executes.
            //      xhr is the request sent and some info about the error
            //      status is usually a small string describing the error

            // This bit will be different on each page, but is a good placeholder
            alert("Cannot Access Data at this time. Please Try again later");
        },
        success: (userData) => {
            let user = userData[urlParams.id];

            fName.append(user.fName);
            lName.append(user.lName);
            posTitle.append(user.posTitle);
            uniOrg.append(user.uniOrg);
        }
    });

    $.ajax({
        type: "GET",
        url: "/users/"+name+"/podcasts/authored",
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
            let cardData = [];
            for (pod of podData) {
                if (pod.uploaderID == urlParams.id) {
                    cardData.push(pod);
                }
            }
            // for each card
            // for each term

            // send the data to loadCard;

            loadcards(cardData);
        }
    });
