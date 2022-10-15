import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    let res2 = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: JSON.stringify({
            "field": "about",
            "value": "Example Value"
        })
    });
    res2 = await res.json();
    res.send("Successfully added.");
}
