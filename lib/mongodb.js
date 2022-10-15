import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
const uri = "mongodb+srv://cluster000:cluster000password@cluster000.du75rzz.mongodb.net/?retryWrites=true&w=majority";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Add Mongo URI to .env.local')
// }

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise
// if (process.env.NODE_ENV === 'development') {
// } else {
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

export default clientPromise