const Persons = (props) =>{
    const listStyle = {
      listStyleType: 'none',
      padding: 0,
      }
    const itemStyle = {
      display: 'flex', 
      alignItems: 'center'  
      };


    return(
    <ul style={listStyle}>
        {props.persons.filter(person => 
        person.name.toLowerCase().includes(props.filterName.toLowerCase())).map(person => (
          <li key={person.id} style={itemStyle}>
            {person.name} {person.number}
            <form style={{ marginLeft: '10px' }}>
              <button 
              type="button" 
              onClick={() => props.deletePerson(person.id)}
              > 
              delete
              </button>
            </form>
          </li>
        ))}
    </ul>
    )
  }

  export default Persons