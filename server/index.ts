import fs from "fs";
import path from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express, { Application, Request, Response, Router } from "express";

import books from "./db.json";
import { isLatest, paginate } from "./helper/pagination";

const imgGen = require("js-image-generator");

const mockMedia = Array.from(Array(100).keys()).map((number) => ({
  id: number,
}));

const app: Application = express();
const router: Router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/media", (req: Request, res: Response) => {
  const count = +(req.query.count || 20);
  const page = +(req.query.page || 1);
  const data = paginate(mockMedia, count, page);
  const last = isLatest(mockMedia, count, page);

  res.json({
    result: data,
    paging: {
      last,
    },
  });
});

router.get("/media/mocks", (req: Request, res: Response) => {
  const result = imgGen.generateImage(180, 100, 80, function (
    err: any,
    image: { data: any }
  ) {
    fs.writeFileSync(path.resolve(__dirname, "media/dummy.jpg"), image.data);
  });
  res.status(200).send(result);
});

router.get("/media/:id", (req: Request, res: Response) => {
  res.json(books.find((book) => book.id === req.params.id));
});

router.post("/media", (req: Request, res: Response) => {
  books.push(req.body);
  res.status(201).json(req.body);
});

router.put("/media/:id", (req: Request, res: Response) => {
  const updateIndex = books.findIndex((book) => book.id === req.params.id);
  res.json(Object.assign(books[updateIndex], req.body));
});

router.delete("/media/:id", (req: Request, res: Response) => {
  const deleteIndex = books.findIndex((book) => book.id === req.params.id);
  books.splice(deleteIndex, 1);
  res.status(204).send();
});

app.use("/api/v1", router);

app.listen(5000, () => {
  console.log("Start server at port 5000.");
});
