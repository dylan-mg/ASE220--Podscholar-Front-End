# Routes
## /
  - sb
  - filter
  - feed

## /categories
  - list of disciplines, num of pods in each
### /categories/:discipline
  - sb
  - filter
  - feed

## /keywords
  - list of tags, num in each
### /keywords/:tags
  - sb
  - filter
  - feed

## /podcasts/
  - same as /
### /podcasts/:podTitle
  - info on pod
  [] Title
  [] abstract
  [] authors
  [] details on manuscript
  [] link to manuscript
  [] doi (if present)
  [] audio
  [] like count/bm count
  [] like count and option
  - similar feed*
  - user comments
### /podcasts/create
  [-] Title
  [ ] Description
  [-] audio file
  [-] bibtex file
  [ ] URL of manuscript
  [-] DOI
  [-] SCientific disciplines
  [-] tags
  [-] Author's names/emails

JSON: Title, Tags, Description


### /podcasts/:podTitle/edit
  - Same form as create, but auto populates with existing pods info
### /podcasts/search
  - no query string means no cards, nothing pops up
  - query string is used to search
    - *?terms=fdfdf*
      - if we want to go nuts, advanced search could be useful


## /auth/
  - ajax authentication on the fly for element generation
### /auth/forgot
  - forgot password
### /auth/create
  - author verification
  - fname, lname, scidisc, tags
    - optional:
      - current affiliation, email at academic org, proof of academic affiliation (link to page), bio, research profiles (links)

## /users
  - if signed in, redirects to self
  - if not signed in, redirects to sign in
### /users/:name
  - not using first/lname 
### /users/:name/authored
### /users/:name/saved

## /account
### /account/details
### /account/settings

## /pages/:pageName

# Pages
## Home Page        *(Both)*        **[ / ]**
- **Search Bar**
  - Title
  - author
  - doi
  - tags?
- **Filter**
  - SciDisc
  - date
  - tags
- **shows most recent pods**
  - [x]Title
  - [x]Author(s)
  - [x]Publication Date
  - [x]Like Count
  - [x]Numbers of Bookmarks
  - [x]audio file
  - [x]Scientific Discipline
  - [x]Tags
  - [x]2 lines abstract

## Home Page        *(Logged In)*   **[ / ]**
- recent pods cards
  - Also include ability to like, bookmark and follow authors