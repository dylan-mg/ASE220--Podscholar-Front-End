// checks if a user is signed in, returns true if so
function bouncer() {
    $.ajax({
        type: "GET",
        url: "/api/buttons",
        data: "data",
        success: function(response) {
            console.log(response);
        }
    });
    console.log(window.sessionStorage);
    if (window.sessionStorage.getItem("username")) {
        if (window.sessionStorage.getItem("auth") == "true") {
            return true;
        }
    }

    return false;
}

function buttonLoader() {


    if (bouncer()) {
        // ACCOUNT INFO
        console.log(window.location.pathname);
        if (window.location.pathname.slice(1) !== "/profile") {
            buttonMan("Profile", "bi-person-fill", `profile.html?ID=${sessionStorage.getItem("ID")}`, btnHoldingLad);
        } else {
            buttonMan("Saved", "bi-bookmark-fill", `/saved`, btnHoldingLad);
        }

        if (window.location.pathname.slice(2) !== "/create") {
            buttonMan("Upload", "bi-upload", "/podcasts/create", btnHoldingLad);
        }

        // BILLING
        buttonMan("Billing", "bi-currency-dollar", "", btnHoldingLad).addEventListener("click", () => {
            alert("not implemented yet");
        });

        // LOGOUT
        buttonMan("Logout", "bi-key-fill", "/sign/out", btnHoldingLad);
        //if signed in, append a series of links
    } else {
        buttonMan("Sign In", "bi-clipboard", "/sign/in", btnHoldingLad)
        buttonMan("Sign Up", "bi-file-earmark-person", "/sign/up", btnHoldingLad)
    }
}

// text content
// icon
// links to
function buttonMan(textMan, iconUsed, linksTo, dest) {
    let newButton = document.createElement("a");
    let buttonIcon = document.createElement("span");

    newButton.classList.add("btn", "btn-dark",
        "header-btn", "d-flex", "flex-column", "px-2");
    buttonIcon.classList.add("bi", iconUsed, "fs-5");
    newButton.href = linksTo;

    newButton.appendChild(buttonIcon);
    newButton.append(textMan);

    dest.appendChild(newButton);

    return newButton;
}