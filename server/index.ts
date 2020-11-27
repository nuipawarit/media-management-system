import fs from "fs";
import path from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express, { Application, Request, Response, Router } from "express";

import db from "./helper/database";
import { isLatest, paginate } from "./helper/pagination";
import { getRandomId } from "./helper/random";

const imgGen = require("js-image-generator");
const app: Application = express();
const router: Router = express.Router();
const simpleThumbnail = require("simple-thumbnail");
const nodeThumbnail = require("node-thumbnail").thumb;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/media", (req: Request, res: Response) => {
  const count = +(req.query.count || 20);
  const page = +(req.query.page || 1);

  const data = db.get("media").value();
  const result = paginate(data, count, page);
  const last = isLatest(data, count, page);

  res.json({
    result,
    paging: {
      last,
    },
  });
});

router.get("/media/mocks", (req: Request, res: Response) => {
  const count = +(req.query.count || 1);

  for (let i = 0; i < count; i++) {
    const mediaId = getRandomId();

    imgGen.generateImage(180, 100, 80, function (
      err: any,
      image: { data: any }
    ) {
      const author = "admin";
      const extension = "jpg";
      const name = `mock-${mediaId}`;
      const size = image.data.length;
      const uploadTime = +new Date();
      const mediaPath = path.resolve(__dirname, `media`);
      const filePath = `${mediaPath}/${name}.${extension}`;
      const thumbnail = `${name}-thumb.jpg`;
      const thumbnail1Path = `${mediaPath}/${thumbnail}`;

      // Save file to server storage
      fs.writeFileSync(filePath, image.data);

      // Save thumbnail file using FFmpeg method
      simpleThumbnail(filePath, thumbnail1Path, "200x?")
        .then(() => console.log("done!"))
        .catch(() => {
          // Using alternative method on first method is failed
          nodeThumbnail({
            destination: mediaPath,
            source: filePath,
            suffix: "-thumb",
            width: 200,
          });
        });

      // Save file data to database
      db.get("media")
        .push({
          author,
          extension,
          id: mediaId,
          name,
          size,
          thumbnail,
          uploadTime,
        })
        .write();
    });
  }

  res.status(200).send("succeeded");
});

router.get("/media/:id", (req: Request, res: Response) => {
  // res.json(books.find((book) => book.id === req.params.id));
});

router.post("/media", (req: Request, res: Response) => {
  // books.push(req.body);
  res.status(201).json(req.body);
});

router.put("/media/:id", (req: Request, res: Response) => {
  // const updateIndex = books.findIndex((book) => book.id === req.params.id);
  // res.json(Object.assign(books[updateIndex], req.body));
});

router.delete("/media/:id", (req: Request, res: Response) => {
  // const deleteIndex = books.findIndex((book) => book.id === req.params.id);
  // books.splice(deleteIndex, 1);
  res.status(204).send();
});

app.use("/api/v1", router);

app.listen(5000, () => {
  console.log("Start server at port 5000.");
});
