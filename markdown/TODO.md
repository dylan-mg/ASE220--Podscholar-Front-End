<script>
    // redirects anyone who tries to load this in browser
    window.location.href = "../index.html";
</script>

# **PodScholar TODO**
Have access to the PDF of the assignment for reference throughout this file. It's what we'll be using for reference on layout design.
The feed we'll be designing for most of these pages will be laid out like the one on the pdf with slight stylization: 
    A vertical list of horizontally laid out cards. Info will be on top with a podcast media player at the bottom which will play the podcast. For now, it'll just be a black retangle with a play symbol on it. When you click that, it "loads" (use timeout function to simulate loading for 1 second) the podcast and plays an audio file we'll have in the assets folder.

## **Layout**
Most described in DESC.md, but keep this stuff in mind:

### **Header**
- Needs to lose a lot of text
- Header will be a solid color, all buttons (except for dropdown menu which will be outlined) will be flush with the header's background color, but when highlighted will be slightly brighter/darker.
- Logo in center, and a div for containing buttons on the right side.
  - For now, just make the buttons the Sign-in and Sign up Buttons
- When you design it, save it to a template so you can easily copy and paste it into other docs
### **Color Theme**
Minimalist, whites, grays, blacks and subtle blues. Keep it simple to save time.
### **Cards**
- Need to be redesigned, though only slightly 
- Bootstrap provides a good start. There's no need for a picture.
  - https://getbootstrap.com/docs/5.0/components/card/
- Cards will have, in order:
  - The Title of the Podcast
  - A list of author names
  - The Journal
  - Year of Publication
  - DOI #
  - Podcast player
- Design a placholder card on the main page, give all of these attributes ID's and the needed classes
- Hide this card and remove all placeholder data. Renmae the id of this card to #templateCard
- use Bootstrap to format as much as possible.

### **Feeds**
- Simple
- a div with a Header (probs h3-ish) and inner div to place cards into. The header text will change based on the web page, but is blank by default.

### **Sign-in, Sign-up page**
- Simple form, make header redirect to index. No buttons in header.

### **Upload Page**
- Header w/ no buttons. Heading, then the text about rules for uploading, then the form to upload.
- have a hidden div with the thank you message when an upload is complete.

### **Profile Page**
- Header, Name, Positon/Title, Uni/ORg, Bio.
- Beneath this is a feed displaying their podcasts
- if this is the viewer's profile, add an edit button

## **Data Manipulation**

### **Ajax Accessors**
- Methods called that retrieve relevant data. They DO NOT VALIDATE DATA. DATA VALIDATION MUST BE DONE BEFORE CALLING THESE METHODS
- **getAuthors()**
  - Returns the array of authors/user data
- **getPods()**
  - Returns the array of Podcast data
- **getCategs()**
  - Returns the array of category data
- **getPodsWCategs()**
  - Returns the array of Podcast data with the category variable changed to the Category name, which is retrieved from the getCategs Function 
- **putAuthors(authInfo)**
  - puts authInfo to json blob
- **putPods(podInfo)**
  - puts pod ray to jsonBlob
- **newAuthor(newAuthData)**
  - gets author data
  - pushes newauthdata to end
  - putAuthors(authorData)
- **updateAuthor(newData, authDex)**
  - Retrieves author data
  - new data is an array of the updated fields with the same names as the original
    - e.g. newData is {fName: "Harry", Bio: "This is my new bio"}
  - updates indices in authdata
  - putAuthors(authInfo)
  - *this will be used for saving a pod to an author's history/saved list*
- **deletePods(pod)**
  - gets Pod array
  - removes podcast at podRay[pod]
  - putPods(podInfo)
- **ratePods(pod, ratingInfo)**
  - gets Pod array
  - appends ratingInfo to PodRay[pod][ratings]
  - put updated podlist to json blob

## **DOM Manipulation**
### Feed Stuff
#### The process of loading a feed:
- create and format a template card. hide it, append it somewhere in the document outside of the feed
- Get the card data and any relevant conditions on the page.
- clone #templateCard, fill it with data, append clone
  - **`cardLoader(cardData)`** -- builds the html of the cards and appends the needed text
    - clone the template
    - give the clone a new id
    - fill the clone with the relevant data
    - append it to the main feed
- **`feedLoader(cardDataArray)`** -- fills the feed with cards
  - CARDS MUST BE MADE FIRST
  - for (card of cardDataArray), call cardLoader(cardData)

- **`filter(podData, conditions)`**
  - for (condition in conditions) loop
    - check if podData[condition] == conditions[condition]
    - if so, add to return array

- **`searchListener(eventObj)`** -- redirects a user to the search page
  - retreives data from search bar.
  - explodes string into array with space seperators
  - generates the query string for the new url
  - redirects user to new url
    - e.g. search bar says "search terms are formatted like this" then the url is: `search.html?query=search+terms+are+formatted+like+this`

- **`indexLoader()`** -- first function called on index.html to load its feed
  - add event listener (searchListener(e)) to search bar's button
  - get pod data
  - load more button at bottom links to search.html

- **`searcher(podData, searchTerms)`** -- searches through pod data for matches
  - create a returnArray = []
  - makes search terms all lowercase
    - will be changed in future
  - Checks if a podcast's title, category or tags match when they are also all lowercase. if they do, add them to returnArray
  - return returnArray

- **`searchLoader(query="all")`** --  first function called on search.html to load the page
  - add event listener to search Button on search bar
    - listener calls searchListener(e)
  - get all pod data
  - if query isn't "all":
    - podData = searcher(podData, query)
    - no else, feedLoader is called below with full podData array
  - then load cards with feedLoader(podData)

- **`authLoader(authID)`** -- function called on profile.html to load the feed data
  - get all pod data
  - podDataVar = filter(podDataVar, {author: authID})
    - filters pod data by only entries from this author
  - feedLoader(podDataVar)

- **`savedLoader(authID)`** -- first function called on saved.html to load page
  - get author data for authors[authID]
    - store the author's saved pod numbers
  - get all pod data
  - get the pods that match the author's saved ID's, store in new array var
  - call FeedLoader(savedPodsVar)

## **Authentication**
