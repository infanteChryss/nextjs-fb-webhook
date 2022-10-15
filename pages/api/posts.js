import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("test");
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            let myPost = await db.collection("items").insertOne(bodyObject);
            res.json(myPost.ops[0]);
        break;
        case "GET":
            const client = await clientPromise;
            const allPosts = await db.collection("items").find().toArray();
            res.json({ data: allPosts });
        break;
    }
}