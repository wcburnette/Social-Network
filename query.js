const { MongoClient, ObjectId } = require('mongodb');

async function run() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('mydatabase');
    const thoughts = database.collection('thoughts');
    
    // Use ObjectId correctly
    const thought = await thoughts.findOne({ _id: new ObjectId("60d5f3f44c2e1e001f4d0b91") });
    console.log(thought);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
