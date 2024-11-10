import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
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
      title: req.body.title.value,
      description: req.body.description.value,
    };

    if (!newVideo.title || !newVideo.description) {
      return res.status(400).send("Missing required fields");
    }

    const postVideo = {
      id: uuidv4(),
      title: newVideo.title,
      channel: "Reine",
      description: newVideo.description,
      image: "https://images.pexels.com/photos/1876620/pexels-photo-1876620.jpeg",
      views: "0",
      likes: "0",
      duration: "0:00",
      video:
        "https://cdn.pixabay.com/video/2018/05/26/16459-272487477_large.mp4",
      timestamp: Date.now(),
      comments: [],
    };
    const videos = returnVideos();

    videos.push(postVideo);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

 
    res.status(201).send("Video upload successful");
  });

export default router;
