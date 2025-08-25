import { useState } from 'react'
import './App.css'
import axios from 'axios'
import UserComp from './UserComp'

function App() {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('');
  const[logged, setLogged] = useState(false);
  // const[verifiedEmail, setVerifiedEmail] = useState('')

  //@ts-ignore
  if(logged)return (<UserComp email={email}/>)

  return (

    <>
       <input type="text" name="" id="" onChange={(e)=>{
        setEmail(e.target.value);
       }}/>
       <input type="password" name="" onChange={(e)=>{
        setPassword(e.target.value)
       }} id="" />

       <button onClick={async()=>{ try {
    const response = await axios.post('http://localhost:3000/signin', {
      email, 
      password
    }, {
      withCredentials: true
    });
    if (response.status === 200) {
      alert("You are logged in");
      setLogged(true);
    }
  } catch (error) {
    alert("Login failed");
  }}}>Submit</button>
    </>
  )
}

export default App
