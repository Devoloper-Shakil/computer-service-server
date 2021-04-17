
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors());
const port =  4000;




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xcxqb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("serviceCenter").collection("service");
  const testimonials = client.db("serviceCenter").collection("reviews");
  const payments = client.db("serviceCenter").collection("payment");
  const adminCollection = client.db("serviceCenter").collection("admins");

  app.post("/AddService", (req, res) => {
    const service = req.body;
    console.log(service);
    collection.insertOne(service)
      .then(result => {
        res.send(result.insertedCount > 0)
        console.log(result)
      })
  })


  app.get('/AddService', (req, res) => {

    collection.find({})
      .toArray((err, result) => {
        res.send(result)
        console.log(result)
      })

  })


  app.delete('/deleteService/:id', (req, res) => {
    collection.deleteOne({ _id: ObjectId(req.params.id) }) 
      .then(result => {

        console.log(result.insertedCount > 0)

      })

  })

  app.post("/AddReview", (req, res) => {
    const review = req.body;
    // console.log(review);
    testimonials.insertOne(review)
      .then(result => {
        res.send(result.insertedCount > 0)

      })
  })



  app.get('/AddReview', (req, res) => {

    testimonials.find({})
      .toArray((err, result) => {
        res.send(result)
        // console.log(result)
      })

  })



  app.get('/AddService/:id', (req, res) => {

    collection.find({ _id: ObjectId(req.params.id) })
      .toArray((err, document) => {
        res.send(document);
        console.log(document)
      })
  })


  app.post("/payment", (req, res) => {
    const payment = req.body;
    // console.log(payment);
    payments.insertOne(payment)
      .then(result => {
        res.send(result.insertedCount > 0)

      })
  })


  app.get('/payment', (req, res) => {

    payments.find({})
      .toArray((err, document) => {
        res.send(document);
        // console.log(document)
      })
  })


  app.post('/admins', (req, res) => {
    const admin = req.body;
    console.log(admin)
    adminCollection.insertOne(admin)
      .then(result => {
        res.send(result.insertedCount > 0)

      })
  })


  app.get('/isAdmins', (req, res) => {

    adminCollection.find({})
      .toArray((err, document) => {
        res.send(document);
        console.log(document)
      })
  })

  app.post('/isAdmins', (req, res) => {
    const email = req.body.email;
    console.log(email)
    adminCollection.find({ email: email })
      .toArray((err, doctors) => {
        res.send(doctors.length > 0);
        // console.log(doctors)
      })
  })


  app.get('/userBook', (req, res) => {
    // console.log(req.query.email)

    payments.find({ email: req.query.email })
      .toArray((err, result) => {
        res.send(result)
        console.log(result)
      })

  })

});





app.get('/', (req, res) => {
  res.send('Hello World!')
})





app.listen(process.env.PORT || port)
