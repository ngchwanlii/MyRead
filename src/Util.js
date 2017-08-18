/* utility function for general purpose */
export const hasProperty = (property) => {
  return property !== undefined
}


export const formatRating = (rating) => {
  return String(rating).length > 1
    ? String(rating.toFixed(1))
    : String(rating)
}
