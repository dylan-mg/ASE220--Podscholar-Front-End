<script>
    // redirects anyone who tries to load this in browser
    window.location.href = "../index.html";
</script>

Now that the plebs are gone, let's talk shop
Hit ctrl + shfit + V to view this doc properly, or don't if this looks better

# Table of contents

# Folder Info
## auth
- all docs used for authentication (sign in, sign up, forgot password etc)

## Markdowns
- has markdowns we'll use for whatever we need them for

## Node Modules
- don't touch it, take it from someone who has, it isn't worth it, let npm do the work here

## pages
- all html files/assets are stored here
- may be given subfolders in future versions

## public
- all assets that are accessible/usable on the client side (barring user info) is stored here
- access them from the client side as if you are directly accessing the public folder
  - e.g. localhost:5500/js/script.js returns /public/js/script.js
  - e.g. localhost:5500/css/main.css returns /public/css/main.css

