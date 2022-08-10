const Url = require("../models/urlModel");
const asyncHandler = require("express-async-handler");
const path = require("path");
const genRanHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
// @desc    Get Urls
// @route   GET /api/url
const getUrls = asyncHandler(async (req, res) => {
  const Urls = await Url.find();
  res.status(200).json(Urls);
});

// @desc    Set url
// @route   POST /api/url
const setUrl = asyncHandler(async (req, res) => {
  const URLregex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  if (!req.body.url) {
    res.status(400);
    throw new Error("Please add a URL!");
  }
  if (URLregex.test(req.body.url)) {
    const urlExists = await Url.findOne({ url: req.body.url });
    let path = genRanHex(12);
    if (!urlExists) {
      const pathExists = await Url.findOne({ path });
      if (pathExists) {
        path = genRanHex(12);
      }
      const url = await Url.create({
        url: req.body.url,
        path,
      });
      res.status(201).json(url);
    } else {
      res.status(200).json(urlExists);
    }
  }else{
    res.status(400).json({error:"Invalid URL, make sure you add HTTP/HTTPS."})
  }
});
// @desc    Get one goal by id
// @route   GET /api/goals/:id
// @access  Private
const redirectPath = asyncHandler(async (req, res) => {
  const url = await Url.findOne({ path: req.params.path });
  if (url) {
    //Update the times clicked
    url.clicked++
    url.save()
    res.redirect(url.url);
  }
});
module.exports = {
  getUrls,
  setUrl,
  redirectPath,
};
