const PersonForm = (props) =>{
return(
<form>
        <div>
          name: <input 
          value = {props.newName}
          onChange = {props.handleNameChange}/>
        </div>
        <div>
          number: <input 
          value = {props.newNumber}
          onChange = {props.handleNumberChange}/>
        </div>
        <div>
          <button type="button" onClick= {props.addPerson}>add</button>
        </div>
      </form>
    )
  }

  export default PersonForm