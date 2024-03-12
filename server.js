const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const r = express.Router();
const Model = require('./model');
const all = require('./all');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const alldata = require('./products.json');
app.use('/api/test', all);

async function main() {
  await mongoose.connect(
    'mongodb+srv://pandeykartik697:msoMv8l1eNkbETC2@api-database.y1ynm25.mongodb.net/api-database?retryWrites=true&w=majority&appName=API-DATABASE',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}

const start = async () => {
  try {
    const d = await Model.deleteMany({});
    // console.log(alldata);
    const p = await Model.create(alldata);
    console.log(p);
  } catch (e) {
    console.log(e);
  }
};
main()
  .then(() => start())
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.listen(5000, () => {
  console.log(`server is on http://localhost:$5000`);
});
