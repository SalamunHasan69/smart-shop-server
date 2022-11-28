const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3kn3bwn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

  try {
    const categoriesCollection = client.db('smartShop').collection('categories');
    const productsCollection = client.db('smartShop').collection('products');
    const bookingsCollection = client.db('smartShop').collection('bookings');
    const usersCollection = client.db('smartShop').collection('users');

    app.get('/categories', async (req, res) => {
      const query = {};
      const cursor = categoriesCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { c_id: id };
      const result = await productsCollection.find(filter).toArray();
      res.send(result)
    });

    app.get('/bookings', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const bookings = await bookingsCollection.find(query).toArray();
      res.send(bookings);
    });

    app.post('/bookings', async (req, res) => {
      const booking = req.body
      console.log(booking);
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    })
  }

  finally {

  };

};
run().catch(error => console.log(error));

app.get('/', async (req, res) => {
  res.send('smart shop server is running');
});

app.listen(port, () => console.log(`Smart shop running on ${port}`));