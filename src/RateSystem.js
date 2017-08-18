import React from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from "prop-types"

const getStarType = (i,  averageRating, bookId, onRatingUpdate) => {

  let starType =  averageRating > i || averageRating === i ? 'star'
    : Math.round(averageRating) === i ? 'star-half-o'
    : 'star-o'

  let obj = {bookId: bookId, value: i}
  return <FontAwesome className='star-icon-style' name={starType} onClick={onRatingUpdate(obj)}/>
}

const RateSystem = (props) => {

  let {bookId, bookRating, onRatingUpdate} = props
  let stars = []

  for(let i = 0; i < 5; i++) {
    stars.push(
      <label className='star-rating-padding' key={bookId + "-" + i}>
        {getStarType(i+1, bookRating[bookId], bookId, onRatingUpdate)}
      </label>
    )
  }
  return (<div>{stars}</div>)
}

/* typechecking with PropTypes */
RateSystem.propTypes = {
  bookId: PropTypes.string,
  bookRating: PropTypes.object,
  onRatingUpdate: PropTypes.func
}

export default RateSystem
