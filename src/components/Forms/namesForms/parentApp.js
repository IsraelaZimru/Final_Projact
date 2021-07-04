import { useState } from 'react';
import NamesForm from './namesForms';


export default function LstInput(props) {
  const [lastName, setLastName] = useState("")

  return <div className="container">
    <h1 className="text-center">Forms Ex.</h1>
    <hr></hr>
    <div className="row">
      <div className="col">
        <NamesForm names={["marta", "sari", "israela", "eliazer", "dafni"]}/>
      </div>
    </div>
  </div>
}
