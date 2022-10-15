import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("test");
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(JSON.stringify(req.body));
            let myPost = await db.collection("items").insertOne(bodyObject);
            res.json(myPost.ops[0]);
        break;
        case "GET":
            const allPosts = await db.collection("items").find().toArray();
            res.json({ data: allPosts });
            // let bodyObject1 = req.params;
            // let myPost1 = await db.collection("items").insertOne(bodyObject1);
            // res.json(myPost1.ops[0]);
        break;
    }
}