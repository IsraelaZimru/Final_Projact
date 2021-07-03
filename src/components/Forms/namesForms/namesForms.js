import { useState } from 'react';
import ListSection from './listSection';
import Form from './onlyForm';



function NamesForm(props) {
    const [names, setNames] = useState(props.names)
    const [newInput, setnewInput] = useState("")

    function removeName(myName) {
        const newLst = names.filter(person => person !== myName);
        setNames(newLst)
    }

    function catchInput(input) {
        setnewInput(input.value)
    }

    function addName(obj) {
        setNames([...names, newInput]);
        props.lastName(newInput)
    }


    return <>
        <div className="col mb-3">
            <ListSection names={names} removeName={removeName} />
            <Form onCatchInput={catchInput} onaddName={addName} />
        </div>
    </>
}

export default NamesForm;




// React Ex:
// 1- Create new component
// 2- It has array of 5 names
// 3- Show them on the page
// 4- Add text box and a button
// 5- The user can enter new name and click the button (edited)
// 6- Continue by enabling to remove name from the list by clicking it (edited)
// 7-
// Now, the initial names are coming from the props:
// function Names(props) {
//   ...
// }
// 8-
// Continue by using 2 Names components, one starting with no names, and the other with 5 names
// Bonus:
// show, above both components,  the last name entered (whether it was from the first Name component, or the other).
// For example - Let say index.js uses Names components, so, index should display the last entered name! (And not the Names components)
