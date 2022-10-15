import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = req.body;

    const client = await clientPromise;
    const db = client.db("test");
    let bodyObject = JSON.parse(body.entry);
    let myPost = await db.collection("items").insertOne(bodyObject);
    res.json(myPost.ops[0]);
    // Checks this is an event from a page subscription
    // if (body.object === 'page') {
  
    //     // Iterates over each entry - there may be multiple if batched
    //     body.entry.forEach(function(entry) {
    //       // Gets the message. entry.messaging is an array, but 
    //       // will only ever contain one message, so we get index 0
    //       let webhook_event = entry.messaging[0];
    //       console.log(webhook_event);
    //     });

    //   // res.json(myPost.ops[0]);
  
    //   // Returns a '200 OK' response to all requests
    //   res.status(200).send(myPost.ops[0]);
    // } else {
    //   // Returns a '404 Not Found' if event is not from a page subscription
    //   res.sendStatus(404);
    // }
  } else {
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
        res.sendStatus(403);      
      }
    } else {
      res.status(200).send("No Params Received");
    }
  }
}
