import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const SearchButton = () => (
  <div className="open-search">
    <Link to="/search"></Link>
  </div>
)

const ListBooks = (props) => {
  let {shelfType, shelves, showBook} = props
  let bookIdArray = Object.keys(shelves[shelfType])

  if(bookIdArray.length > 0){
    return (
      <ol className="books-grid">
        {bookIdArray.map((bookId, i) => showBook(i, bookId, 'none'))}
      </ol>
    )
  }
  return null
}

const convertTitle = (shelfType) => {
  return (shelfType.charAt(0).toUpperCase() + shelfType.slice(1)).match(/[A-Z][a-z]+/g).join(" ")
}

const HomePage = (props) => {
  let {shelves, showBook} = props
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelves).map((shelfType) =>
              <div key={shelfType} className="bookshelf">
                <h2 className="bookshelf-title">{convertTitle(shelfType)}</h2>
                <div className="bookshelf-books">
                  <ListBooks shelfType={shelfType} shelves={shelves} showBook={showBook}/>
                </div>
              </div>
          )}
        </div>
        <SearchButton />
      </div>
    </div>
  )
}

/* typechecking with PropTypes */
HomePage.propTypes = {
  shelves: PropTypes.object,
  showBook: PropTypes.func
}

ListBooks.propTypes = {
  shelfType: PropTypes.string,
  shelves: PropTypes.object,
  showBook: PropTypes.func
}

export default HomePage
