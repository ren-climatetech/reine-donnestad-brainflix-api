import express from "express";
import fs from "fs";
const router = express.Router();



function returnVideos() {
  const videos = fs.readFileSync("./data/videos.json");
  const parsedData = JSON.parse(videos);
  return parsedData;
}

router

  .get("/", (_req, res) => {
    const videos = returnVideos();
    res.json(videos);
  })

  .get("/:id", (req, res) => {
    const videos = returnVideos();
    const video = videos.find((v) => v.id === req.params.id);
    if (video) {
      res.json(video);
    } else {
      res.status(404).send("No video with that id exists");
    }
  })

  .post("/", (req, res) => {
    const newVideo = {
      title: req.body.title,
      description: req.body.description,
    };
    console.log(newVideo);
    console.log("render videos");
    res.status(201).send("Video upload succesful");
    console.log(req.body);
    //add extra properties to this. id, hardcoded url for the image. keep it exactly like how you have in the json file. use fs.write. review salad/soup lab. 
  });

export default router;
