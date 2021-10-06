const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
   console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.v3rtg.mongodb.net/fullstack-note-app?retryWrites=true&w=majority`

try {
    mongoose.connect(url)
} catch (error) {
    console.log(error);
}

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("fullstack-note-app").collection("notes");
//   // perform actions on the collection object
//   client.close();
// });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.createCollection();

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// }).catch(err => {
//     console.log(err)
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })