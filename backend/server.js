const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/search', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('Missing URL');
  }

  try {
    const googleSearchUrl = `https://www.google.com/search?q=${url}`;
    const response = await axios.get(googleSearchUrl);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
