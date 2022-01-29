import { connectToDatabase } from "../../../util/mongodb";
import { Timestamp } from "mongodb";

const handler = async (req, res) => {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  // Fetch posts from DB
  if (method === "GET") {
    try {
      const posts = await db
        .collection("posts")
        .find()
        .sort({ timestamp: -1 }) // this line sort the results by timestamp DESC
        .toArray();
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
    }
  }

  // Insert post in the DB
  if (method === "POST") {
    try {
      const posts = await db
        .collection("posts")
        .insertOne({ ...body, timestamp: new Timestamp() });
      res.status(201).json(posts);
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
