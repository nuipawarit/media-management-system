import path from "path";

import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import { MediaFile } from "../types/media";

const dbFilePath = path.resolve(__dirname, "../db.json");
const adapter = new FileSync<{ media: MediaFile[] }>(dbFilePath);
const db = low(adapter);

db.defaults({ media: [] }).write();

export default db;
