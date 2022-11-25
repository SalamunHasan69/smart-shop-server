const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.send('smart shop server is running')
})

app.listen(port, () => console.log(`Smart shop running on ${port}`))