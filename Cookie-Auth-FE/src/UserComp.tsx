import React from 'react'
import axios from 'axios'

//@ts-ignore
function UserComp(props) {
  return (
    <div>
        <h1>hdlliopvc</h1>
      <h1>{props.email}</h1>
      <button onClick={async()=>{
        try {
            const response = axios.post('http://localhost:3000/logout',{
            },{
                withCredentials:true
            }
        )
        if((await response).data.message === 'logged out'){
            alert('hahah')
        }
        } catch (error) {
            alert("Logout failed");
        }
      }}>logout</button>
    </div>
  )
}

export default UserComp
