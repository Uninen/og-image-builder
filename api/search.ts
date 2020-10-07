import axios from 'axios'

module.exports = (req, res) => {
  const { query, page } = req.query

  axios
    .get('https://api.unsplash.com/search/photos', {
      params: {
        query: query,
        orientation: 'landscape',
        page: page,
        per_page: 15,
      },
      headers: {
        Authorization: `Client-ID ${process.env.GRIDSOME_UNSPLASH_ACCESS_KEY}`,
      },
    })
    .then(function(response) {
      res.status(200).json(response.data)
    })
}
