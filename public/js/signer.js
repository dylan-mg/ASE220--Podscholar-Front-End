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
            if (failData.id) {
                window.sessionStorage.setItem("username", failData.id);
                window.sessionStorage.setItem("auth", failData.verStat);
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

    if (verif(e.target) == false) {
        alert("Submission Failed");
    }
}

function emailCheck(formData) {
    let sendData = {
        email: formData.email
    }

    $.ajax({
        type: "POST",
        url: "/sign/up/email",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success: (retdata) => {
            if (retdata.verified == 2) {
                emailTakenError.classList.remove("visually-hidden");
                return false;
            } else if (retdata.verified == 1) {
                badEmailError.classList.remove("visually-hidden");
                return false;
            } else {
                return true;
            }
        },
        error: (xhr, status) => {
            console.log(xhr);
            console.log(status);
            console.log("object");
            alert("Cannot Register at this time. Please Try again later");
            return false;
        },
    });
}

function verif(formData) {
    if (formData[5].value !== formData[6].value) {
        ifPWmatch.classList.remove("visually-hidden");
        return false;
    }

    const dataFromForm = {
        email: formData[2].value,
        password: formData[5].value,
        fName: formData[0].value,
        lName: formData[1].value,
        posTitle: formData[3].value,
        uniOrg: formData[4].value,
    };

    if (emailCheck(dataFromForm) == false) {
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/sign/up",
        contentType: "application/json",
        data: JSON.stringify(dataFromForm),
        error: (xhr, status) => {
            console.log(xhr);
            alert("Cannot Register at this time. Please Try again later");
        },
        success: (data) => {
            if (data.message) {
                formMan.classList.add("visually-hidden");

                // show done message
                doneMessage.classList.remove("visually-hidden");

                // log them in
                sessionStorage.setItem("username", data.message);
                sessionStorage.setItem("auth", true);

                // redirect automatically
                setTimeout(() => {
                    window.location.href = "/"
                }, 10000);
                return true;
            } else {
                alert("Please Resubmit your form");
                return false;
            }
        }
    })

}