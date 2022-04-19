<script>
    // redirects anyone who tries to load this in browser
    window.location.href = "../index.html";
</script>

# **PodScholar** -- To Do List

## **Header for Most Pages**
- PS logo at top center
- **two buttons** in the top right
    - When a user is _not_ logged in:
        - Link to Register
        - Link to Log in
    - When user is signed in:
        - **Their Name**
            - links to their profile
        - **Dashboard Dropdown Menu**
            - Consists of:
                - My Profile
                - Saved Podcasts
                  - only if we implement it, if not, just an alert
                - Rules For Podcasts Link
                - Billing
                  - for now, clicking this just triggers an alert that says it isn't implemented yet
                - Log out, redirects to signOut.html
- clicking the header redirects to index.html
---
## **Feeds**
- Feed Title
    - changes based on where the feed is loaded
        - _main page:_ Recent Uploads
        - _Search page:_ Search Results for [search query]
        - _Author page:_ Podcasts from [Author Name]
        - _Saved Podcasts Page:_ Saved Podcasts
- All pages that use the feed has `<div id = "feed" class="[tbd]"></div>`
    - Any cards loaded for feed are appeneded here
---
## **Cards**
- Article Title
- Author [s?]
- Category[?]
- Year
- DOI #
- Podcast
---
## **Main Index Page**
- Simple
- Header
- Displays newest 15 podcasts
- Load More button at bottom links to `search.html`
- Footer
---
## **Search Page**
- Same layout as index
- The biggest pain
- feed
- more to be added to this section, it's a lot
---
## **About Page**
- Header
- contains this:
    > PodScholar is a platform for scholars to podcast their published work. Each podcast provides the scholar an opportunity to discuss their manuscript with an informative and conversational tone. Each podcast is created by a scholar or research group and each podcast corresponds to one of the scholar’s published articles. Scholars are encouraged to discuss all main parts of the published work including, but not limited to the introduction, methods, results and discussion sections. Scholars now have a platform to broadcast their work as a dialogue in which they have autonomy as to how they want to explain and discuss their own scholarship. The rules for podcasting are straight forward, but the most basic rule is one podcast per one published article!

    > Currently, PodScholar podcasts are limited to a 20-minute maximum duration. Podcasts include the journal link to help listeners find the published article for further reading and dissemination. The PodScholar audio library will increase as more scholars upload their content. Any published scholarship can be podcasted and uploaded, regardless of date published and discipline. PodScholar aims to create the world’s largest audio library of scholarly activity which is created and narrated by the professionals who conducted the research. Join the PodScholar community to upload, listen, and share!
- footer
---
## **Sign In Page**
- Header is just the Logo that links to the home page
- If signed in, redirects to profile
- Form with email and password
- Authentication done via AJAX
  - disable sign-in button and form
  - GET authors from jsonblob
  - search through emails
    - if no emails match the input email
      - output error message, re-enable sign in button and form
    - if an email is found, compare the passwords
      - if passwords match
        - sign in, add info to cookies, redirect to main
      - if no match, output error message, re-enable sign in button and form
- no footer
---
## **Sign Up Page**
- Header is just logo that links to the home page
- if signed in, redirects to profile
- Form with this info [novalidate attribute]: * means required
  - ***Name*** [first] [last]*
    - two text inputs
  - ***Email****
    - email input
  - ***Position/Title****
    - text input
  - ***University/Organisation****
    - text input
  - ***Create Password****
    - password input
  - ***Confirm Password****
    - password input
  - *****Terms And Conditions******
    - checkbox
  - ***Register Button****
    - submit button
- **On Submission**
    - prevent default
    - disable button and all form fields
      - can display loading spinner
    - ***Validation:***
      - *Name*
        - No numbers, only letters dashes, spaces
        - 2+ letters minimum, 32 letters maximum
        - failing any of these marks the field as invalid, display error message
        - passing them all marks them as validated
      - *Email*
        - Regex
          - if valid in regex, check if email exists in json blob users
            - if email doesn't exist, mark as validated
            - if exists, mark as invalid, display error message
          - if fails regex, mark as invalid, display error message
      - *Position/Title*
        - same as name, longer maximum
        - if fails, mark as invalid, display error message
        - else mark as validated
      - *University/Organization*
        - same as name, longer maximum
        - if fails, mark as invalid, display error message
        - else mark as validated
      - *Create Password*
        - validate password
          - come up with your own requirements, they don't have to be secure yet
            - if fails regex, mark as invalid, display error message
            - else mark as validated
      - *Confirm Password*
        - Validate via regex
        - confirm that it matches create password field
        - if fails regex, mark as invalid, display error message
        - else mark as validated
      - *Terms And Conditions*
        - If checked, mark as valid
        - else mark as invalid, display error message
    - ***Submission***
      - Loop through the fields. If any have .is-invalid, remove all .is-valid classes
      - attach listeners to the .is-invalid fields.
        - on change, remove .is-invalid, hide error message
      - re-enable all fields and submission button
    - ***Upon Successful Sign in***
      - hide the form
      - Set up cookies with their info
      - Display Successful sign in message (see assignment pdf)
- no footer
---
## **sign out page**
- if not signed in, redirects to index before doing anything
- When a user signs out, they are redirected here
- Blank page, except says "Signing out" with a Loading spinner below it
- Kills cookies, redirects to main
---
## **Rules for Podcasts Page**
- if not signed in, redirect to index
- Simple page, nothing fancy
- See pdf for rule list
- Only Header and Text
  - Header is just logo that links to index, no buttons
- No footer
---
## **Upload Pod Page**
- if not signed in, redirects to index
- Header
- Instructions for how to upload
- ***Form:***
  - **Name**
    - First and last
    - two inputs
  - **Email**
    - email input
  - **Article Title**
    - text input
  - **Journal**
    - text input
  - **Category**
    - select menu
  - **Published**
    - date input
  - **DOI #**
    - number input
  - **3-6 keywords for search optimization**
    - comma separated
    - text input
  - **Fake upload file thing**
    - Can't upload audio files to mp3, so just make it whatever you want
  - **Terms and conditions**
    - Checkbox
- **VALIDATION**
  Works the same as sign up in terms of invalidating things. On submission, disable everything, etc
    - **Name** is same as sign up
    - **email**
      - reg-ex
    - **Article Title**
      - reg-ex?
        - not really sure how you'd reg-ex this comprehensively, because of how often academic study titles use punctuation, so surprise me
        - minimum 10 characters, surprise me on the max
    - **Journal**
      - reg-ex, same as article title
      - minimum 10 characters, surprise me on the max
    - **Category**
      - reg-ex, text, hyphens
    - **Published**
      - cannot be later than today
    - **DOI #**
      - reg-ex, just in case
    - **3-6 keywords for search optimization**
      - explode into array
      - if less than 3/more than 6, invalid
      - if a keyword is more than like 15-20 characters, invalid
    - **Fake upload file thing**
      - depends on what you make the file
    - **Terms and conditions**
      - ensure that it's checked
---
## **User Info Page**
    - if not signed in, redirects to index
    - Uses GET parameters e.g. profile.html?userID=4
    - if this profile is the current viewer's:
      - adds edit button to top right corner of profile
      - changes the feed title to "My podcasts"
      - [Adds "edit tags" and "delete" button to every podcast card]
        - if we have time
    - Displays profile info
    - Displays the podcasts an author has uploaded
        - should be able to build this using the same backend as search/cardLoader
        - set search to author = [thisauthor] or something like that
---
## **Footer for all pages**
- About Us (leads to About Page)
---
## **Pagination**
- Do not implement pagination until you have the feed fully functional on all pages
  - sounds obvious, but just trust me
---
## **Saved Podcast Feed**
- low priority
- Header
- Basic feed, no search bar
  - checks user's saved list
  - cross references the index# of each entry with the podcast list indices
  - displays relevant pods
  - Loads cards
---