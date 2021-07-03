import { useState } from 'react';
import NamesForm from './namesForms';


export default function LstInput(props) {
  const [lastName, setLastName] = useState("")

  return <div className="container">
    <h1 className="text-center">Forms Ex.</h1>
    <p className={"text-center"}>the last name added is: {lastName}</p>
    <hr></hr>
    <div className="row">
      <div className="col">
        <NamesForm names={["marta", "sari", "israela", "eliazer", "dafni"]} lastName={setLastName} />
      </div>
      <div className="col">
        <NamesForm names={[]} lastName={setLastName} />
      </div>
    </div>
  </div>
}
