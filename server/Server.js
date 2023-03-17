const express = require('express');
const app = express();
const cors = require("cors");
const dataPath = "./data.json";
const fs = require('fs');

require('dotenv').config();

const { PORT, OPENAI_API_KEY, BACKEND_URL, CLIENT_URL } = process.env;
console.log("port", PORT, "apikey" , OPENAI_API_KEY, "backURL",  BACKEND_URL, "clientURL", CLIENT_URL)

app.use(
  cors({
    origin: [CLIENT_URL, `${BACKEND_URL}:${PORT}`],
  })
);

const port = process.env.PORT || process.argv[2] || 8080;

app.use(express.json());

if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]));
}

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: "org-GUBFw2dZ81gYq0LK56Z1uQqn",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const axios = require('axios');
console.log(`OPENAI_API_KEY = ${OPENAI_API_KEY}`);

app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        "model": "image-alpha-001",
        "prompt": `${prompt}`,
        "n": 1,
        "size": '1024x1024',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'organization': "org-GUBFw2dZ81gYq0LK56Z1uQqn",
        }
      }
    );
    console.log(response.data);
    const result = {
      prompt,
      url: response.data.data[0].url,
    };
    res.status(200).json(result);
  } catch (error) {
    console.error(error.response.data); 
    res.status(500).send('Error generating image.');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
