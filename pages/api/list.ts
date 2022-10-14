// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zyfh5of.mongodb.net/mylist?retryWrites=true&w=majority`
  );
  const db = client.db();
  const myList = db.collection("mylist");
  const data = req.body;

  if (req.method == "POST") {
    let duplicate = await myList.findOne({ id: parseInt(data) });
    const result = await myList.insertOne(data);
    client.close();
    res.status(201).json(result);
  } else if (req.method == "DELETE") {
    
    const result = await myList.findOneAndDelete({ id: parseInt(data) });
   
    res.status(201).json(result);
    // res.status(201).json(result)
  } else if (req.method == "GET") {
    const result = await myList.find().toArray();
   
    res.status(201).json(result);
  }
  client.close();
}
