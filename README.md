MyRead apps - Created by Jay Ng (ngchwanlii)

Source folder link at: https://github.com/ngchwanlii/MyRead
<br />
<br />
Enable New Javascript Features on Google Chrome: chrome://flags/#enable-javascript-harmony (because I have used spread syntax in this project, just in case if your Google Chrome doesn't support latest ES syntax, you have to download the plugin from the link above)

# How to run the repository?
1. git clone this folder to your local environment from github repository
2. change directory to the folder where your downloaded files located at
3. in terminal (mac book), type yarn start and the project will run in your local browser (http://localhost:3000/)


Checklist:

# Application Setup
1. download the src folder at the link above, then open compiler and navigate to the folder, type 'yarn-star' to start launch it (done)
2.  README file to describe the project and some details (done)

# Main page
1. main page show 3 shelves for books (done)
2. main page show a control that allow users to move book between shelves (done)
3. information persist between pages (done) - NOTE: I've implemented "extra features - rating system", if the browser is relaunch (which call the Udacity's provided BooksAPI to get all the books, then the rating system will gone away because I realize that the BooksAPI.update(book, shelf) ONLY store the information between shelf and books id, and there is no way for me to update the rating system to the BooksAPI backend server. that's why the rating gone when browser refresh even my rating system work fine in local environment (when the server doesn't restart), it works when transition between home page <> search page, the purpose of building these rating system is because I want to learn it and it is cool!)

# Search page
1. The search page has a search input field. As the user types into the search field, books that match the query are displayed on the page (done)
2. Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf (done)
3. When an item is categorized on the search page, and the user navigates to the main page, it appears on that shelf in the main page. (done)

# Routing
1. main page link to search page (done)
2. search page link back to main page (done)

# Code Function
1. Books have the same state on both the search page and the main application page: If a book is on a bookshelf, that is reflected in both location (done)

# Extra features
To improve myself, I have added few extra features, which is just learnt in these few day and it's really cool!
1. <Book details informaton> (when you click the "i" icon on top left corner of the book cover, you can see the book details in a pop up modal window, I have also implement some logic about the expanded text based on user action the - "Read more/Less link" )
2. <Rating System> you can click on star below the book covers to rate its rating, the average rating is counted as = total rating/total rating counts, so when one user clicked the star, it update the rating counts and total rating, then recalculate the average rating. The details and logic can be seen in the src code in RatingSystem.js

# Future plan
1. add sorting to sort books category and create another UI view
2. learn Redux!
