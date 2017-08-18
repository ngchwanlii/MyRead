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

const HomePage = (props) => {

  let {shelvesTitles, ...booksArg} = props
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelvesTitles).map((shelfType) =>
              <div key={shelfType} className="bookshelf">
                <h2 className="bookshelf-title">{shelvesTitles[shelfType]}</h2>
                <div className="bookshelf-books">
                  <ListBooks shelfType={shelfType} {...booksArg}/>
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
  shelvesTitles: PropTypes.object,
  shelves: PropTypes.object,
  showBook: PropTypes.func
}

ListBooks.propTypes = {
  shelfType: PropTypes.string,
  shelves: PropTypes.object,
  showBook: PropTypes.func
}

export default HomePage
