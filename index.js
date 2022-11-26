const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3kn3bwn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

  try {
    const categoriesCollection = client.db('smartShop').collection('categories');

    app.get('/categories', async (req, res) => {
      const query = {};
      const cursor = categoriesCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    app.get('/products', async (req, res) => {

    })
  }

  finally {

  }

}
run().catch(error => console.log(error));

app.get('/', async (req, res) => {
  res.send('smart shop server is running')
})

app.listen(port, () => console.log(`Smart shop running on ${port}`))