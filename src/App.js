import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import Book from './Book'
import RateSystem from './RateSystem'
import * as Util from './Util'
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelvesTitles: {},
    shelves: {
      "currentlyReading": {},
      "wantToRead": {},
      "read": {}
    },
    books: {},
    bookShelve: {},
    bookRating: {},
    toogleBookInfo: false,
    expandText: false,
    clickedBook: {}
  }

  handleExpandText = (event) => {
    event.stopPropagation()
    this.setState((state) => ({
      expandText: true
    }))

  }

  handleMinimizeText = (event) => {
    event.stopPropagation()
    this.setState((state) => ({
      expandText: false
    }))
  }

  handleCloseModalWindow = (event) => {
    this.setState((state) => ({
      toogleBookInfo: false,
      expandText: false,
      clickedBook: {}
    }))
  }

  handleToogleBookInfo = selectedBook => (event) => {
    this.setState((state) => ({
      toogleBookInfo: true,
      clickedBook: selectedBook
    }))
  }

  // Object spread/rest syntax ref: https://github.com/tc39/proposal-object-rest-spread
  // IMPORTANT:  # Overriding Properties  # Updating Deep Immutable Object ref: https://github.com/tc39/proposal-object-rest-spread/blob/master/Spread.md
  handleBookShelfUpdate = bookId => (event) => {
    const {books, bookShelve, shelves} = this.state
    let current = bookShelve[bookId]
    let target = event.target.value
    let currentShelve = {}
    let targetShelve =  {}
    // deep copy  - follow immutability rules for setState
    let newBookShelve = {...bookShelve}
    let newShelves = {...shelves}

    newBookShelve[bookId] = target

    if(target !== current){

      if (current !== "none"){
        currentShelve = {...shelves[current]}
        delete currentShelve[bookId]
        newShelves[current] = currentShelve
      }

      if (target !== "none") {
        targetShelve = {...shelves[target]}
        targetShelve[bookId] = books[bookId]
        newShelves[target] = targetShelve
      }
    }

    BooksAPI.update(books[bookId], target)
    this.setState((state) => (
      {shelves: newShelves, bookShelve: newBookShelve}
    ))
  }

  handleBookRatingUpdate = ({bookId, value}) => (e) =>  {
    this.setState((state) => (
      {bookRating: {...state.bookRating, [bookId]: parseFloat(value)}}
    ))
  }

  handleBooksUpdate = (bookId, book) => {
    this.setState((state) => (
      {books: {...state.books, [bookId]: book}}
    ))
  }

  showBook = (i, bookId, book) => {

    // deep copy
    const {bookShelve, books, bookRating, toogleBookInfo, expandText, clickedBook} = {...this.state}

    if(!(bookId in bookShelve)) {
      bookShelve[bookId] = "none"
    }

    if(!(bookId in bookRating)) {
      bookRating[bookId] = Util.hasProperty(book.averageRating) ? book.averageRating : 0
    }

    if(book !== "none" && !(bookId in books)) {
      books[bookId] = book
    }

    return (
      <div key={bookId + "-" + i}>
        <Book
          bookId={bookId}
          books={books}
          bookShelve={bookShelve}
          onShelfUpdate={this.handleBookShelfUpdate}
          toogleBookInfo={toogleBookInfo}
          expandText={expandText}
          clickedBook={clickedBook}
          onToogleBookInfo={this.handleToogleBookInfo}
          onExpandText={this.handleExpandText}
          onMinimizeText={this.handleMinimizeText}
          onCloseModalWindow={this.handleCloseModalWindow}
          bookRating={bookRating}
          onRatingUpdate={this.handleBookRatingUpdate}
        />
        <RateSystem
          bookId={bookId}
          bookRating={bookRating}
          onRatingUpdate={this.handleBookRatingUpdate}
        />
      </div>
    )
  }

  componentDidMount = () => {
      /*  deep copy object - follow immutability rules
          pass around this object for initialization in the for loop instead of setState in for loop (avoid keep re-rendering in a for loop to setState)
          then after completely initialization, set all new state at once, so render only trigger once
      */
      let shelves = {...this.state.shelves},
          currentlyReading = {...this.state.shelves.currentlyReading},
          wantToRead = {...this.state.shelves.wantToRead},
          read = {...this.state.shelves.read},
          shelvesTitles = {...this.state.shelvesTitles},
          books = {...this.state.books},
          bookShelve = {...this.state.bookShelve},
          bookRating = {...this.state.bookRating}

      Object.keys(shelves).forEach((shelf) => {
          shelvesTitles[shelf] = (shelf.charAt(0).toUpperCase() + shelf.slice(1)).match(/[A-Z][a-z]+/g).join(" ")
      })

      BooksAPI.getAll().then((result) => {
        result.forEach((book) => {
            books[book.id] = book
            if(book.shelf === "currentlyReading"){
              currentlyReading[book.id] = book
            }
            else if(book.shelf === "wantToRead"){
              wantToRead[book.id] = book
            }
            else if(book.shelf === "read"){
              read[book.id] = book
            }
            bookShelve[book.id] = book.shelf
            bookRating[book.id] = Util.hasProperty(book.averageRating) ? book.averageRating: 0
        })
        shelves["currentlyReading"] = currentlyReading
        shelves["wantToRead"] = wantToRead
        shelves["read"] = read
        // set new state at once
        this.setState((state) => ({shelvesTitles, shelves, books, bookShelve, bookRating}))
      })
  }

  render() {

    let {shelvesTitles, shelves} = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <HomePage
              shelvesTitles={shelvesTitles}
              shelves={shelves}
              showBook={this.showBook}
            />
          </div>
        )}/>
        <Route path="/search" render={() => (
          <div>
            <SearchPage
              showBook={this.showBook}
            />
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
