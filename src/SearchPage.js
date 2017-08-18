import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchPage extends Component {

  state = {
    query: '',
    searchResult: [],
    cacheResult: {}
  }

  updateQuery = ({target}) => {
    let newQuery = target.value
    // using cache to store searched query and result (so don't need to invoke BooksAPI in backend server), optimize speed
    let copyCacheResult = {...this.state.cacheResult}
    if(newQuery && !(newQuery in copyCacheResult)) {
      BooksAPI.search(newQuery, 20).then((result) => {
        copyCacheResult[newQuery] = result
        this.setState((state) => ({
          query: newQuery,
          searchResult: result,
          cacheResult: copyCacheResult
        }))
      })
    }
    else if(newQuery) {
      this.setState((state) => ({
        query: newQuery,
        searchResult: copyCacheResult[newQuery]
      }))
    }
    else {
      this.setState((state) => ({
        query: '',
        searchResult: []
      }))
    }
  }

  showSearchBook = (booksArray) => {

    let {showBook} = this.props

    return booksArray.length > 0 ? booksArray.map((book, i) => {
        return showBook(i, book.id, book)
      })
      : null
  }

  render () {

    let copySearchResult = [...this.state.searchResult]
    let content = this.showSearchBook(copySearchResult)

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Back</Link>
          <div className="search-books-input-wrapper">
            <input onChange={this.updateQuery} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {content}
          </ol>
        </div>
      </div>
    )
  }
}

SearchPage.propTypes = {
  showBook: PropTypes.func
}

export default SearchPage
