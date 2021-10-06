const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
   console.log(
     `Please provide the password as an argument: 
        node mongo.js <password>
        node mongo.js <password> <add-name> <add-number>`)
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.v3rtg.mongodb.net/fullstack-phonebook-app?retryWrites=true&w=majority`

try {
    mongoose.connect(url)
} catch (error) {
    console.log(error);
}

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Phonebook', phonebookSchema)

if(process.argv.length===5) {
  console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    date: new Date(),
  })
  person.save().then(result => {
    console.log('phonebook saved!')
    mongoose.connection.close()
  }).catch(err => {
      console.log(err)
      mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log(`ID \t Name \t Number`)
    result.forEach(person => {
      console.log(`${person._id.toString()} \t ${person.name.toString()} \t ${person.number.toString()}`)
    })
    mongoose.connection.close()
})
}

