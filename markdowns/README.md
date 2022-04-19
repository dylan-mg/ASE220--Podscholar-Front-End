<script>
    // redirects anyone who tries to load this in browser
    window.location.href = "../index.html";
</script>

Now that the plebs are gone, let's talk shop

# PodScholar Info
This is a document that has all the info needed to get to work on PodScholar

## JSON Blob Info
### Author Info
http://jsonblob.com/952466594483945472
#### Get Author Info
```javascript
    $.ajax({
        type: "GET",
        url: "https://jsonblob.com/API/jsonBlob/952466594483945472",
        contentType: "application/json",
        error: (xhr, status) => {
            // if the request fails, this function executes.
            //      xhr is the request sent and some info about the error
            //      status is usually a small string describing the error

            // This bit will be different on each page, but is a good placeholder
            alert("Cannot Access Data at this time. Please Try again later");
        },
        success: (data) => {
            // if the request succeeds, this function executes

            // for now, just log the data
            console.log(data);
            /* will return array of objects formatted like this:
               {
                    "email": "gainesd2@nku.edu",
                    "password": "abc123!",
                    "fName": "Dylan",
                    "lName": "Gaines",
                    "posTitle": "Student",
                    "uniOrg": "Northern Kentucky University",
                    "savedPods": [1, 2, 3],
                    "history": [1, 2 ,3]
                }
            */
        }
    });
```

#### Update Author Info
```javascript
    // Assume data is validated and properly formatted
    // create the object and format it the same way as other objects
    const dataFromForm = {
        email: emailFromForm,
        password: pwFromForm,
        fName: fNameFromForm,
        lName: lNameFromForm,
        posTitle: posTitleFromForm,
        uniOrg: uniOrgFromForm,
        savedPods: [],
        history: []
    };
    // first get the data
    $.ajax({
        type: "GET",
        url: "https://jsonblob.com/API/jsonBlob/952466594483945472",
        contentType: "application/json",
        error: (xhr, status) => {
            // if the request fails, this function executes.
            //      xhr is the request sent and some info about the error
            //      status is usually a small string describing the error

            // This bit will be different on each page, but is a good placeholder
            alert("Cannot Access Data at this time. Please Try again later");
        },
        success: (data) => {
            // Once you have the data, push the data from the form to the end of the already existing data
            data.push(dataFromForm);

            // upload new data to the Blob
            $.ajax({
                type: "PUT",
                url: "https://jsonblob.com/API/jsonBlob/952466594483945472",
                contentType: "application/JSON",
                dataType: "application/JSON",
                data: JSON.stringify(data),
                error: (xhr, status) => {
                    alert("Cannot Access Data at this time. Please Try again later");
                    //redirect them
                },
                success: function(output, status, xhr) {
                    // if data successfully added, do a thing!
                    // Be sure to redirect the user tho
                }
            });
        }
    });
```

### Categories
http://jsonblob.com/952473694085857280
#### GET Categories
```javascript
$.ajax({
        type: "GET",
        url: "http://jsonblob.com/API/jsonBlob/952473694085857280",
        contentType: "application/json",
        error: (xhr, status) => {
            // if the request fails, this function executes.
            //      xhr is the request sent and some info about the error
            //      status is usually a small string describing the error

            // This bit will be different on each page, but is a good placeholder
            alert("Cannot Access Data at this time. Please Try again later");
        },
        success: (data) => {
            // if the request succeeds, this function executes

            // for now, just log the data
            console.log(data);
            /* will return an array of objects formatted like like this:
                [
                    {
                        "name" : "Sports",
                        "desc": "You know what sports are"
                    },
                    {
                        "name" : "Tech",
                        "desc": "nerd stuff"
                    },
                    {
                        "name" : "Business",
                        "desc": "Money Machine go brrrr"
                    },
                    etc
                ]
            */
        }
    });
```

### Podcast Info
http://jsonblob.com/952471299104718848
#### GET podcast info (with category)
```javascript
    // Get Podcast
    $.ajax({
        type: "GET",
        url: "https://jsonblob.com/API/jsonBlob/952471299104718848",
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
            // Once the podcast data is retrieved, you'll probably have to cross reference it with the category data, so get that as well
            $.ajax({
                type: "GET",
                url: "https://jsonblob.com/API/jsonBlob/952473694085857280",
                contentType: "application/json",
                error: (xhr, status) => {
                    // if the request fails, this function executes.
                    //      xhr is the request sent and some info about the error
                    //      status is usually a small string describing the error

                    // This bit will be different on each page, but is a good placeholder
                    alert("Cannot Access Data at this time. Please Try again later");
                },
                success: (categData) => {
                    // if the request succeeds, this function executes

                    // for now, just log the data
                    console.log(categData);
                    // Within THIS is where you append article info to the page
                    // to access the category name and description
                    console.log(categData[podData.category]);
                    // returns the object containing the info on the relevant category
                    //     e.g. {name= "Sports", desc="description of sports"}
                }
            });
        }
    });
```

#### PUT new podcast (no categ needed)
```javascript
let newPodData = {
        "DOI": formDOInum,
        "fName": formFName,
        "lName": formLName,
        "email": formEmail,
        "title": formTitle,
        "journal": formJournal,
        "category": formCategory,
        "published": formDate, // This will be formatted according to the date class in actual storage
        "tags": formTagList,
        "filePlaceHolder": formFile,
        "ratings": []
    }
    $.ajax({
        type: "GET",
        url: "https://jsonblob.com/API/jsonBlob/952471299104718848",
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

            // push new 
            podData.push(newPodData);

            $.ajax({
                type: "PUT",
                url: "https://jsonblob.com/API/jsonBlob/952471299104718848",
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
                    // if data successfully added, do a thing!
                    // Be sure to redirect the user tho
                }
            })
        }
    });
```