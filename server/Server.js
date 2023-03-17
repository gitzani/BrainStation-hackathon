const express = require('express');
const app = express();
const cors = require("cors");
const dataPath = "./data/data.json";
const fs = require('fs');

require('dotenv').config();

const { PORT, OPENAI_API_KEY, BACKEND_URL, CLIENT_URL } = process.env;
console.log("port", PORT, "apikey" , OPENAI_API_KEY, "backURL",  BACKEND_URL, "clientURL", CLIENT_URL)

app.use(cors());

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

// const openai = new OpenAIApi(configuration);

const axios = require('axios');
console.log(`OPENAI_API_KEY = ${OPENAI_API_KEY}`);



app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        "model": "image-alpha-001",
        "prompt": `"A portrait of a [race] holding a [weapon]. is [age] years old and have [strenght] as its most strong personality trait or skill and is [experience] in battles.  The scene is a war scene and the character is in the center of if" use the prompt that follow to fill the [race], [wepon], [strenght], [age], and [experience] for the requested picture: here is the prompt${prompt}`,
        "n": 1,
        "size": '1024x1024',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'organization': "org-3SIupZV3cE6kjxBNeZ5Oi2Ml",
        }
      }
    );
    console.log(response.data);
    const result = {
      id: Math.random().toString(36).substr(2, 9),
      prompt,
      url: response.data.data[0].url,
    };
    await saveData(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.response.data); 
    res.status(500).send('Error generating image.');
  }
});

const saveData = async (data) => {
  try {
    let existingData = [];
    if (fs.existsSync(dataPath)) {
      existingData = JSON.parse(fs.readFileSync(dataPath));
    }
    const newData = [...existingData, data];
    fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2));
  } catch (error) {
    console.error(error);
  }
};

app.get('/characters', (req, res) => {
  try {
    const characters = JSON.parse(fs.readFileSync(dataPath));
    res.status(200).json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting characters.');
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
