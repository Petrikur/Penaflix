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
    console.log(duplicate);
   
  
      const result = await myList.insertOne(data);
      client.close();
   
  } else if (req.method == "DELETE") {
    // const findDoc = await myList.findOne({id:data})
    // console.log(findDoc)
    // const result = await myList.deleteOne({"_id":"6348721ad269ff82298a916a"});
    console.log(data);
    const result = await myList.findOneAndDelete({ id: parseInt(data) });
    console.log(result);
  }
  client.close();
  res.status(201).json({});
}
