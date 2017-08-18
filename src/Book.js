import React from 'react'
import PropTypes from "prop-types"
import * as Util from './Util'

/* function */
const setAuthorTitle = (authorsArray) => {
  if(Util.hasProperty(authorsArray)){
    return authorsArray.length > 1 ? 'Authors': 'Author'
  }
  return null
}

const setupBackgroundImage = (book) => {
  if(Util.hasProperty(book.imageLinks)) {
    return Util.hasProperty(book.imageLinks.smallThumbnail) ? `url(${book.imageLinks.smallThumbnail})`
      : Util.hasProperty(book.imageLinks.thumbnail) ? `url(${book.imageLinks.thumbnail})`
      : null
  }
  return null
}

const readMoreButton = (content, onExpandText) => {
  return !(content instanceof Array) && content.length  > 200
    ? <a onClick={onExpandText} className="expand-or-less-link">(Read more)</a>
    : null
}

const lessButton = (title, onMinimizeText) => (
  title === "Description"
  ? <a onClick={onMinimizeText} className="expand-or-less-link"> (Less)</a>
  : null
)

/* stateless functional component */
const BookDetailContent = ({property, title, content, expandText, onExpandText, onMinimizeText}) => {
  if(Util.hasProperty(property)) {
    return (
      <div className="book-info-detail-content-wrapper">
        <div className="book-info-bold-title">
          <span>{title}</span>
        </div>
        <div className="book-info-content-description">
          <span>{`: `}
            {
              content instanceof Array
              ? content.map((author, index) => (
                  index !== content.length-1 ? `${author}, `: author
                ))
              : content.length < 200 ? content : !expandText ? content.substring(0,201) + " ... ": content
            }
          </span>
          {!expandText ? readMoreButton(content, onExpandText):  lessButton(title, onMinimizeText)}
        </div>
      </div>
    )
  }
  return null
}


const BookInfoModalWindow = (props) => {

  let {toogleBookInfo, expandText, book, clickedBook, rating,
    onExpandText, onMinimizeText, onCloseModalWindow} = props

  return clickedBook.id === book.id  && toogleBookInfo ?
  (
    <div className="book-info-fallback" onClick={onCloseModalWindow}>
      <div className="book-info-modal-window">
        <div className="book-info-close-btn" onClick={onCloseModalWindow}>&times;</div>
        <div className="book-info-wrapper">
          <div className="book-info-book-cover" style={{ width: 128, height: 193, backgroundImage: setupBackgroundImage(book)}}></div>
          <div className="book-info-detail-contents">
            <BookDetailContent property={book.title} title={"Title"} content={book.title} expandText={expandText} onExpandText={onExpandText} onMinimizeText={onMinimizeText}/>
            <BookDetailContent property={book.contentVersion} title={"Version"} content={book.contentVersion} expandText={expandText} onExpandText={onExpandText} onMinimizeText={onMinimizeText}/>
            <BookDetailContent property={rating} title={"Rating"} content={Util.formatRating(rating)} expandText={expandText} onExpandText={onExpandText} onMinimizeText={onMinimizeText}/>
            <BookDetailContent property={book.authors} title={setAuthorTitle(book.authors)} content={book.authors} expandText={expandText} onExpandText={onExpandText} onMinimizeText={onMinimizeText}/>
            <BookDetailContent property={book.publisher} title={"Publisher"} content={book.publisher} expandText={expandText} onExpandText={onExpandText} onMinimizeText={onMinimizeText}/>
            <BookDetailContent property={book.language} title={"Language"} content={book.language} expandText={expandText} onExpandText={onExpandText} onMinimizeText={onMinimizeText}/>
            <BookDetailContent property={book.description} title={"Description"} content={book.description} expandText={expandText} onExpandText={onExpandText} onMinimizeText={onMinimizeText}/>
          </div>
        </div>
      </div>
    </div>
  )
  : null
}

const BookIcon = ({onToogleBookInfo, book}) => (
  <div className="book-info-icon" onClick={onToogleBookInfo(book)}></div>
)

const BookCoverImage = ({book, onSetupBackroundImage}) => {
  return (
      <div className="book-cover"
        style={{ width: 128, height: 193, backgroundImage: setupBackgroundImage(book)}}>
      </div>
    )
}

const BookShelfChangerButton = ({bookId,  bookShelve, onShelfUpdate}) => {

  return(
    <div className="book-shelf-changer">
      <select value={bookShelve[bookId]} onChange={onShelfUpdate(bookId)}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

const BookTitle = ({book}) => {
  if(Util.hasProperty(book.title)){
    return <div className="book-title">{book.title}</div>
  }
  return null
}

const BookAuthors = ({book}) => {
  if(Util.hasProperty(book.authors)){
    return (
      <div>
        {book.authors.map((author) => <div key={author} className="book-authors">{author}</div>)}
      </div>
    )
  }
  return null
}

const Book = (props) => {
  let {bookId, books, bookShelve, onShelfUpdate, toogleBookInfo,
      expandText, clickedBook, onToogleBookInfo, onExpandText, onMinimizeText, onCloseModalWindow,
      ...ratingArgs} = props

  let book = books[bookId]

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <BookInfoModalWindow
            toogleBookInfo={toogleBookInfo}
            expandText={expandText}
            book={book}
            clickedBook={clickedBook}
            rating={ratingArgs["bookRating"][bookId]}
            onExpandText={onExpandText}
            onMinimizeText={onMinimizeText}
            onCloseModalWindow={onCloseModalWindow}
          />
          <BookIcon onToogleBookInfo={onToogleBookInfo} book={book}/>
          <BookCoverImage book={book}/>
          <BookShelfChangerButton bookId={bookId} bookShelve={bookShelve} onShelfUpdate={onShelfUpdate}/>
        </div>
        <BookTitle book={book}/>
        <BookAuthors book={book}/>
      </div>
    </li>
  )
}


/* typechecking with PropTypes */
Book.propTypes = {
  bookId: PropTypes.string,
  toogleBookInfo: PropTypes.bool,
  expandText: PropTypes.bool,
  books: PropTypes.object,
  bookShelve: PropTypes.object,
  bookRating: PropTypes.object,
  clickedBook: PropTypes.object,
  onShelfUpdate: PropTypes.func,
  onRatingUpdate: PropTypes.func,
  onToogleBookInfo: PropTypes.func,
  onExpandText: PropTypes.func,
  onMinimizeText: PropTypes.func,
  onCloseModalWindow: PropTypes.func
}

BookInfoModalWindow.propTypes = {
  expandText: PropTypes.bool,
  toogleBookInfo: PropTypes.bool,
  book: PropTypes.object,
  clickedBook: PropTypes.object,
  rating: PropTypes.number,
  onExpandText: PropTypes.func,
  onMinimizeText: PropTypes.func,
  onCloseModalWindow: PropTypes.func
}

BookIcon.propTypes = {
  book: PropTypes.object,
  onToogleBookInfo: PropTypes.func
}

BookCoverImage.propTypes = {
  book: PropTypes.object,
}

BookShelfChangerButton.propTypes = {
  bookId: PropTypes.string,
  bookShelve: PropTypes.object,
  onShelfUpdate: PropTypes.func
}

BookTitle.propTypes = {
  book: PropTypes.object
}

BookAuthors.propTypes = {
  book: PropTypes.object
}

export default Book
