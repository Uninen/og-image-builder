import axios from 'axios'

module.exports = (req, res) => {
  const { photo } = req.query

  axios
    .get(`https://api.unsplash.com/photos/${photo}/download`, {
      headers: {
        Authorization: `Client-ID ${process.env.GRIDSOME_UNSPLASH_ACCESS_KEY}`,
      },
    })
    .then(function() {
      res.status(200).json({ success: true })
    })
}
