import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test");
  switch (req.method) {
      case "POST":
          let bodyObject = JSON.parse(req.body.object);
          let myPost = await db.collection("items").insertOne(bodyObject);
          res.status(200).send("Successfully Added");
      break;
      case "GET":
        // Your verify token. Should be a random string.
        let VERIFY_TOKEN = "YOUR_VERIFY_TOKEN"
          
        // Parse the query params
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
          
        // Checks if a token and mode is in the query string of the request
        if (mode && token) {
        
          // Checks the mode and token sent is correct
          if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
            
          } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.status(403).send("Forbidden Access");      
          }
        } else {
          res.status(404).send("No Params Received");
        }
      break;
  }
}
