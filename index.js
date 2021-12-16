const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://gramoday:newuser123456@cluster0.hahq7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("product");
    const productsCollection = database.collection("products");

    // GET API
    app.get("/getusers", async (req, res) => {
      const cursors = productsCollection.find({});
      const users = await cursors.toArray();
      res.send(users);
    });

    // POST API
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await productsCollection.insertOne(newUser);
      // console.log(newUser);
      // console.log("got new user", req.body);
      // console.log("got new user", result);
      const ID = result.insertedId;
      res.json({ reportID: ID, status: "success" });
      console.log(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello From Gramoday");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
