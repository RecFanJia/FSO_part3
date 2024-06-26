import { useState, useEffect  } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/filteredpersons'
import personService from './services/persons'
import { Notification, BadNotification } from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)
  const [badnotification, setBadNotification] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      console.log('render', persons.length, 'persons',)
      console.log('response data',response.data)
        setPersons(response.data)
        console.log('persons',persons)
      })
  }, [])
  

  const addPerson = () => {
    const personExistLocal = persons.some(person => person.name === newName)
    console.log('localexist',personExistLocal)

      if (personExistLocal) {
        const personup = persons.find(person => person.name === newName);
        const personId = personup.id
        console.log('personId is', personId)
        const updatenumber = { ...personup, number: newNumber}
        console.log('updatenumber is', updatenumber)
        const updatedPersons = persons.map(person => {
          if (person.id === personId) {
            return { ...person, number: newNumber };
          } else {return person}})
        const confirmAdd = confirm(
          `${personup.name} is already added to phonebook, replace the old number with a new one?`
        )// ask for confirmation for adding

      if (!confirmAdd) {
        console.log('Adding cancelled by user.');
       
      }else{
        personService
        .update(personId, updatenumber)
        .then(() => {
          setPersons(updatedPersons)   
          setNewName('')
          setNewNumber('')
          setNotification(`Updated ${personup.name}'s number`)
          setTimeout(() => {setNotification(null)}, 5000)
        })
        .catch(error => {
          setBadNotification(
            `Information of ${personup.name} has already been removed from server`
          )
          setTimeout(() => {setBadNotification(null)}, 5000)
          setPersons(persons.filter(person => person.id !== personId))
        })
    }
    
    }else{


    const personObject = {
      name: newName,
      number: newNumber,
      //id: (newId).toString() 
    }
    
    personService
    .create(personObject)
    .then(() => {
      setPersons(persons=> persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setNotification(`Added ${newName} `)
      setTimeout(() => {setNotification(null)}, 5000)
    })
    .catch(error => {
      console.log(error.response.data.error)
      setBadNotification(`${error.response.data.error}`)
      setTimeout(() => {setBadNotification(null)}, 5000)
    })
    
  }
}

  const deletePerson = (id) => {
    const deleteName = persons.find(person => person.id === id).name
    const confirmDeletion = confirm(`Delete ${deleteName}?`);
  if (!confirmDeletion) {
    console.log('Deletion cancelled by user.');
    return; // ask for confirmation for deleting
  }

    personService.remove(id)
    .then(() => {
        console.log(`Deleted person with id ${id}`)
        setNotification(`Deleted ${deleteName}`)
        setTimeout(() => {setNotification(null)}, 5000)
    })
    .catch(error => {
        console.error('Error deleting the person:', error)
    }) //delte person from phonebook
    const updatedPersons = persons.filter(person => person.id !== id)
    setPersons(updatedPersons)
}


  const handleNameChange = (event) => {
    console.log('event.target.value:',event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('event.target.value:',event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
    console.log('event.target.value:',event.target.value)
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <BadNotification message={badnotification} />
      <Filter 
      filterName={filterName} 
      handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
      newName={newName} 
      handleNameChange={handleNameChange}
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}
      addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
      persons={persons}
      filterName={filterName} 
      deletePerson={deletePerson}
      />
    </div>
  )
}

export default App