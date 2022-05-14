function uploader() {
    uploadForm.addEventListener("submit", uploadPod);
    optionalFields("auth");
    optionalFields("tag");
    $("#tagBtn").trigger("click");
    $("#tagBtn").trigger("click");
    $("#tagBtn").trigger("click");
    $("#authBtn").trigger("click");
}

/**
 * 
 * @param {string} prefix 
 */
function optionalFields(prefix) {
    let counter = 0;
    // when the button for adding a new element is clicked
    $(`#${prefix}Btn`).on("click", (ev) => {
        let elClone = $(`#${prefix}Template`).clone(true);
        elClone.attr("id", `${prefix}${counter}`);
        elClone.removeClass("visually-hidden");

        let fieldMan = $(`#${prefix}Fields`);
        fieldMan.append(elClone);

        /**
         * @type {JQuery<HTMLElement>}
         */
        let inMan = $("input", elClone);
        inMan.removeAttr("disabled hidden");
        inMan.attr("required", true);

        /**
         * @type {JQuery<HTMLElement>}
         */
        let btnMan = $("button", elClone);

        // set it to visible
        btnMan.removeAttr("disabled hidden");

        // set id for reference, increment here so all refs to id in this entry are the same
        btnMan.val(`${counter++}`);

        // deletes author from field
        btnMan.on("click", (de) => {
            let targetedEntry = $(`#${prefix}${de.target.value}`, fieldMan)[0];
            counter--;
            targetedEntry.remove();
        });
    });
}

/**
 * 
 * @param {Event} e 
 */
function uploadPod(e) {
    e.preventDefault();

    console.log(e.target);

    //  e.target.submit();

    /* let tagList = e.target[4].value.split(","); */
    /* ,
    "DOI": e.target[6].value,
    "journal": e.target[1].value,
    "category": e.target[3].value,
    "tags": tagList,
    "filePlaceHolder": e.target[7].value,
    "ratings": [],
    "publishers": e.target[2].value,
    "pubDate": e.target[5].value */
    let newPodData = {
        "uploaderID": sessionStorage.getItem("ID"),
        "title": e.target[0].value
    }

    // TODO input validation!
    /*     $.ajax({
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
                newPodData.ID = podData.length;
                // push new 
                podData.push(newPodData);

                $.ajax({
                    type: "PUT",
                    url: "https://jsonblob.com/api/jsonBlob/952471299104718848",
                    contentType: "application/json",
                    dataType: "application/json",
                    data: JSON.stringify(podData),
                    error: (xhr, status) => {
                        // if the request fails, this function executes.
                        //      xhr is the request sent and some info about the error
                        //      status is usually a small string describing the error

                        // This bit will be different on each page, but is a good placeholder
                        alert("Cannot Access Data at this time. Please Try again later");
                    },
                    success: (data) => {
                        formHolder.classList.add("visually-hidden");
                        thanksMessage.classList.remove("visually-hidden");

                        setTimeout(() => {
                            window.location.href = "index.html"
                        }, 15000);
                    }
                });
            }
        }); */


}