function signInStart() {
    // attach sign in listener to form
    document.querySelector("#signForm").addEventListener("submit", function(e) {
        e.preventDefault();

        signIn(e);
    });
}

function signIn(e) {
    // make input data object
    let sendData = {
        email: e.target[0].value,
        password: e.target[1].value
    }

    // post input data
    $.ajax({
        type: "POST",
        url: "/sign/in",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        error: (xhr, status) => {
            // if the request fails, this function executes.
            //      xhr is the request sent and some info about the error
            //      status is usually a small string describing the error

            // This bit will be different on each page, but is a good placeholder
            alert("Cannot Access Data at this time. Please Try again later");
        },
        success: (failData) => {
            console.log(failData);
            if (failData.verStat) {
                window.sessionStorage.setItem("username", failData.id);
                window.sessionStorage.setItem("auth", failData.verStat);
                window.sessionStorage.setItem("role", failData.role);
                console.log(window.sessionStorage);
                window.location.href = "/";
            } else {
                // if not found, display invalid feedback
                invalidFeedback.classList.remove("visually-hidden");

                // add listener to hide feedback when stuff changes
                signForm.addEventListener("change", function() {
                    invalidFeedback.classList.add("visually-hidden");
                });
            }
        }
    });
}

function signUpSetup() {
    document.querySelector("#formMan").addEventListener("submit", (e) => {
        signUp(e);
    });
}

function signUp(e) {
    e.preventDefault();

    if (!verif(e.target)) {
        alert("Please resubmit your form.");
    }
}

function verif(formData) {
    if (formData[5].value !== formData[6].value) {
        ifPWmatch.classList.remove("visually-hidden");
        return false;
    }

    $.ajax({
        type: "GET",
        url: "https://jsonblob.com/api/jsonBlob/952466594483945472",
        contentType: "application/json",
        error: (xhr, status) => {
            // if the request fails, this function executes.
            //      xhr is the request sent and some info about the error
            //      status is usually a small string describing the error

            // This bit will be different on each page, but is a good placeholder
            alert("Cannot Register at this time. Please Try again later");
        },
        success: (userdata) => {
            for (user of userdata) {
                if (user.email == formData[2].value) {
                    emailError.classList.remove("visually-hidden");
                    return false;
                }
            }

            const dataFromForm = {
                email: formData[2].value,
                password: formData[5].value,
                fName: formData[0].value,
                lName: formData[1].value,
                posTitle: formData[3].value,
                uniOrg: formData[4].value,
                savedPods: [],
                history: []
            };
            // first get the data
            $.ajax({
                type: "GET",
                url: "https://jsonblob.com/api/jsonBlob/952466594483945472",
                contentType: "application/json",
                error: (xhr, status) => {
                    // if the request fails, this function executes.
                    //      xhr is the request sent and some info about the error
                    //      status is usually a small string describing the error

                    // This bit will be different on each page, but is a good placeholder
                    alert("Cannot register at this time. Please Try again later.");
                },
                success: (authdata) => {
                    // Once you have the data, push the data from the form to the end of the already existing data
                    authdata.push(dataFromForm);

                    // upload new data to the Blob
                    $.ajax({
                        type: "PUT",
                        url: "https://jsonblob.com/api/jsonBlob/952466594483945472",
                        contentType: "application/JSON",
                        dataType: "application/JSON",
                        data: JSON.stringify(authdata),
                        error: (xhr, status) => {
                            alert("Cannot Access Data at this time. Please Try again later");

                            console.log(status);
                            console.log(xhr);
                        },
                        success: function(output, status, xhr) {
                            // hide form
                            formMan.classList.add("visually-hidden");

                            // show done message
                            doneMessage.classList.remove("visually-hidden");

                            // log them in
                            sessionStorage.setItem("email", dataFromForm.email);
                            sessionStorage.setItem("auth", true);

                            // redirect automatically
                            setTimeout(() => {
                                window.location.href = "../index.html"
                            }, 15000);
                            return true;
                        }
                    });
                }
            });
        }
    });

}