const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware 
app.use(cors());
app.use(express.json());

// automotive
// Np1tjCtm67AT4MiT



// mongbd start
const uri = "mongodb+srv://automotive:Np1tjCtm67AT4MiT@cluster0.grsw8p5.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const carCollection = client.db('carDB').collection('car');
    const cartCollection = client.db('carDB').collection('cart');

    // app.get('/car',async(req,res)=>{
    //     const cursor = carCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })


    app.get('/car',async(req,res)=>{
      const cursor = carCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })

    app.get('/cart',async(req,res)=>{
      const cursor = cartCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })

    app.get("/car/:id" , async(req,res)=>{
        const id = req.params.id;
        const query = {brandname: id}
        const result = await carCollection.findOne(query);
        res.send(result)
    })
    app.get("/car/:id" , async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await carCollection.findOne(query);
      res.send(result)
  })

    
    app.post('/car', async(req,res)=>{
        const newCar = req.body;
        console.log(newCar);
        const result = await carCollection.insertOne(newCar);
        res.send(result);
    })

    app.post('/cart', async(req,res)=>{
      const newCart = req.body;
      console.log(newCart);
      const result = await cartCollection.insertOne(newCart);
      res.send(result);
  })

  // delete cart

  app.delete("/cart/:id", async(req,res)=>{
    const id = req.params.id;
    const query = {_id: id};
    const result = await cartCollection.deleteOne(query);
    res.send(result);
  })
  // update cart
  app.get('/car/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await cartCollection.findOne(query);
    res.send(result);
  })

  app.put('/car/:id',async(req,res)=>{
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const options = { upsert: true };
    const updateCar = req.body;
    const car = {
      $set :{
        productname:updateCar.productname,
        image:updateCar.image,
        brandname:updateCar.brandname,
        price:updateCar.price,
        description:updateCar.description,
        ratting:updateCar.ratting,
      }
    }
    const result = await carCollection.updateOne(filter,car,options)
    res.send(result);
  })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// mongodb

app.get('/',(req,res) => {
    res.send('Automotive server is running')
})

app.listen(port,()=>{
    console.log(`Automotive server is running on port : ${port}`)
})
