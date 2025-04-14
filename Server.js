const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const urlDetailsModel = require("./models/urlDetailsModel");

const regexExpression =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const generateShortCode = async () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortcode = "";
  for (i = 0; i < 6; i++) {
    shortcode += chars[Math.floor(Math.random() * 62)];
  }
  const isShortcodePresent = await urlDetailsModel.find({
    shortcode: shortcode,
  });
  if (isShortcodePresent === false) {
    return generateShortCode();
  }

  return shortcode;
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To URL Shorterning Service");
});

// URL POST request
app.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (!regexExpression.test(url)) {
    res.status(400).json({ message: "Invalid URL" });
    return;
  }
  try {
    const _id = (await urlDetailsModel.countDocuments()) + 1;
    const shortcode = await generateShortCode();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const accessCount = 0;

    const newShortURL = await urlDetailsModel.create({
      _id,
      url,
      shortcode,
      createdAt,
      updatedAt,
      accessCount,
    });

    res.status(201).json({ newShortURL });
  } catch (error) {
    res.status(400).json({ message: "Some Error Occurred !" });
    console.log(error);
  }
});

// URL GET request
app.get("/shorten/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const urlInfo = await urlDetailsModel.findOne({ shortcode: id });
    if (!urlInfo) {
      res.status(404).json({ message: "URL not found !" });
      return;
    }
    urlInfo.accessCount += 1;
    await urlInfo.save();
    res.status(200).json({
      _id: urlInfo._id,
      url: urlInfo.url,
      shortcode: urlInfo.shortcode,
      createdAt: urlInfo.createdAt,
      updatedAt: urlInfo.updatedAt,
    });
  } catch (error) {
    console.log("Error !");
    console.log(error);
    res.status(500);
  }
});

// URL PUT request
app.put("/shorten/:id", async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  const urlChangeInfo = await urlDetailsModel.findOne({ shortcode: id });
  if (!urlChangeInfo) {
    res.status(404).json("URL not found !");
    return;
  }
  if (!regexExpression.test(url)) {
    res.status(400).json({ message: "Invalid URL" });
    return;
  }
  try {
    urlChangeInfo.url = url;
    urlChangeInfo.updatedAt = new Date().toISOString();
    await urlChangeInfo.save();

    res.status(200).json({
      _id: urlChangeInfo._id,
      url: urlChangeInfo.url,
      shortcode: urlChangeInfo.shortcode,
      createdAt: urlChangeInfo.createdAt,
      updatedAt: urlChangeInfo.updatedAt,
    });
  } catch (error) {
    console.log("Some Error Occured !");
    console.log(error);
  }
});

//URL DELETE request
app.delete("/shorten/:id", async (req, res) => {
  const { id } = req.params;
  const deleteShortcode = await urlDetailsModel.findOneAndDelete({
    shortcode: id,
  });
  if (!deleteShortcode) {
    res.status(404).json({ message: "short URL was not found." });
  } else {
    res.status(200).json({ message: "short URL was successfully deleted." });
  }
});

//URL GET stats request
app.get("/shorten/:id/stats", async (req, res) => {
  const { id } = req.params;
  const urlStats = await urlDetailsModel.findOne({ shortcode: id });
  if (!urlStats) {
    res.status(404).json({ message: "short URL was not found." });
  } else {
    res.status(200).json({ urlStats });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/UrlShorteningService")
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(`Connected to the port ${port} and connected to the db`);
    });
  })
  .catch((err) => {
    console.log("Some error occured !");
    console.log(err);
  });
