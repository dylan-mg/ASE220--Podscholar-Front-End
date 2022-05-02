function uploader() {
    uploadForm.addEventListener("submit", uploadPod);
    optionalFields("auth");
    optionalFields("tag");
    $("#tagBtn").trigger("click");
    $("#tagBtn").trigger("click");
    $("#tagBtn").trigger("click");
    $("#authBtn").trigger("click");

    $("#title").val("sdfsdfs");
    $("#doi").val("sdfsdfs");
    $("#pubDate").val("2022-03-03");
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
        // TODO generify
        if (inMan.length > 1) {
            inMan[0].classList.add("authName");
            inMan[1].classList.add("authEmail");
        } else {
            inMan.addClass("tagMan");
        }

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

function messageStuff() {
    $(".errorMessage").addClass("visually-hidden");
}

function verifyPod(e, emails) {
    e.preventDefault();
    messageStuff();
    // ajax for doi

    if (document.querySelectorAll(".tagMan").length < 3) {
        $("#tagMessage").removeClass("visually-hidden");
        return false;
    } else if (document.querySelectorAll(".authName").length < 1 && document.querySelectorAll(".authName").length == document.querySelectorAll(".authEmail").length) {
        $("#authMessage").removeClass("visually-hidden");
        return false;
    }

    let doiStuff = { doi: $("#doi").val() };

    $.ajax({
        type: "POST",
        url: "/api/formInfo/doi/check",
        contentType: "application/json",
        data: JSON.stringify(doiStuff),
        error: (xhr, status) => {
            alert("Cannot Access Data at this time. Please Try again later");
        },
        success: (data) => {
            if (data.message !== true) {
                return false;
            }
        }
    });

    $.ajax({
        type: "POST",
        url: "/api/formInfo/email/check",
        contentType: "application/json",
        data: JSON.stringify(emails),
        error: (xhr, status) => {
            alert("Cannot Access Data at this time. Please Try again later");
        },
        success: (data) => {
            if (data.message !== true) {
                false;
            }
        }
    });

    return true;
}

/**
 * 
 * @param {SubmitEvent} e 
 */
function uploadPod(e) {
    e.preventDefault();

    let authors = [];
    let authNames = e.target.querySelectorAll(".authName");
    let authEmails = e.target.querySelectorAll(".authEmail");

    // because both are in one field, no need to iterate twice
    for (let i = 0; i < authNames.length; i++) {
        let authTemp = {
            email: authEmails[i].value,
            name: authNames[i].value
        }

        authors.push(authTemp);
    }

    if (verifyPod(e, authors)) {
        let formData = {
            title: $("#title").val(),
            pubDate: $("#pubDate").val(),
            category: $("#category").val(),
            doi: $("#doi").val(),
            description: $("#description").val()
        }

        let taglist = [];
        let authNameList = [];
        let tagFields = document.querySelectorAll(".tagMan");

        console.log(tagFields);
        for (let tagLad of tagFields) {
            taglist.push(tagLad.value);
        }
        formData.tagList = taglist;
        formData.authors = authors;
        console.log(formData);

        let newLad = new FormData(e.target);

        console.log(typeof e.target);

        //e.target.submit(); // submits the files once verified
        //authFields.elements -- emails and names
        //tagFields.elements
        //handle files separate
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

}