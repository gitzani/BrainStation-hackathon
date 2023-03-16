require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { Configuration } = require("openai");
//const { ImagesApi } = require("openai");


const app = express();

// Define server configuration from ENV file
const { PORT, OPENAI_API_KEY, BACKEND_URL, CLIENT_URL } = process.env;

console.log("port", PORT, "apikey" , OPENAI_API_KEY, "backURL",  BACKEND_URL, "clientURL", CLIENT_URL)


// Define CORS from ENV file
app.use(
  cors({
    origin: [CLIENT_URL, `${BACKEND_URL}:${PORT}`],
  })
);

// Define the path to the data.json file
const dataPath = path.join(__dirname, "./data/data.json");

// Define the OpenAI configuration
const openaiConfiguration = new Configuration({
  apiKey: OPENAI_API_KEY,
 
});

// Define the OpenAI Images API
//const imagesApi = new ImagesApi(openaiConfiguration);

// Define a route handler that generates the images and saves them to the server
app.post("/generate-image", async (req, res) => {
  try {
    const { data } = req.body;
    const charinput = JSON.stringify(data);
    const prompt = `Create an image of ${charinput}`;
    const n = 1;
    const size = "300x300";

    const response = await imagesApi.generateImages({
      prompt,
      n,
      size,
    });

    const imagesDir = path.join(__dirname, "../images");
    const images = [];

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }

    response.data.forEach((image, index) => {
      const id = `image${Date.now()}-${index}`;
      const imagePath = path.join(imagesDir, `${id}.jpg`);
      const stream = fs.createWriteStream(imagePath);
      stream.write(image);
      stream.end();
      images.push({
        id,
        path: imagePath,
        data,
      });
    });

    const jsonData = JSON.stringify({ images });

    fs.writeFileSync(dataPath, jsonData);

    res.json({ success: true, message: "Image generated and saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to generate and save image" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
