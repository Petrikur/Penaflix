// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {MongoClient} from "mongodb"



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) 

{
  const data = req.body;
  console.log(data)

  
 
    const client = await MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zyfh5of.mongodb.net/mylist?retryWrites=true&w=majority`)
    const db = client.db();
    const myList = db.collection("mylist")
    const result = await myList.insertOne(data)
    console.log(result)
    client.close()
 
  
  res.status(201).json({});
 
  // res.status(200).json({ name: 'John Doe' })
}
