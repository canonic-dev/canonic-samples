import dayjs from "dayjs"

dayjs.extend((_, dayjsClass) => {
  const oldFormat = dayjsClass.prototype.format
  dayjsClass.prototype.format = function (args) {
    return oldFormat
      .bind(this)(args)
      .replace(/\bWe\b/g, Math.ceil(this.get("date") / 7))
  }
})

export default function bucketMovies(movies) {
  const buckets = movies.reduce((buckets, movie) => {
    const key = dayjs(movie.releaseDate).startOf("week")
    buckets[key] = buckets[key] ? [...buckets[key], movie._id] : [movie._id]
    return buckets
  }, {})

  return Object.keys(buckets)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map(key => ({
      key,
      movies: buckets[key],
      title: `${dayjs(key).format("MMM, YYYY: Week We")}`,
    }))
}
