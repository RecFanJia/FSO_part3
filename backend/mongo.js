//onst mongoose = require('mongoose')
//
//f (process.argv.length<3) {
// console.log('give password as argument')
// process.exit(1)
//
//
//onst password = process.argv[2]
//
//onst url =
// `mongodb+srv://geofanjia:${password}@cluster0.dw4tvqm.mongodb.net/`
//
//ongoose.set('strictQuery',false)
//ongoose.connect(url)
//
//onst personSchema = new mongoose.Schema({
// Name: String,
// Number: String,
//)
//
//onst Person = mongoose.model('Person', personSchema)
//
//onst person = new Person({
//ame: process.argv[3],
//umber: process.argv[4],
//)
//
/// if input has no name and number, then display all the persons in the phonebook 
//f(process.argv.length<5){
// Person.find({}).then(result => {
//   console.log("phonebook:")
//   result.forEach(person => {
//     console.log(
//       ` ${person.Name} ${person.Number}`)
//   })
//   mongoose.connection.close()
// })
//else{
/// if input has name and number, then and them to phonebook
// person.save().then(result => {
// console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
// mongoose.connection.close()
//).catch(err => {
// console.error("error", err);
//);
//
//
//