function uploader() {
    uploadForm.addEventListener("submit", uploadPod(e))
}

function uploadPod(e) {
    e.preventDefault();

    let tagList = e.target[4].value.split(",");
    let newPodData = {
        "uploaderID": sessionStorage.getItem("ID"),
        "DOI": e.target[6].value,
        "title": e.target[0].value,
        "journal": e.target[1].value,
        "category": e.target[3].value,
        "tags": tagList,
        "filePlaceHolder": e.target[7].value,
        "ratings": [],
        "publishers": e.target[2].value,
        "pubDate": e.target[5].value
    }

    // TODO input validation!
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
    });


}