import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Tester() {

    const [loggedInUser , setLoggedInUser] = useState({});

    useEffect(() => {
            axios.get('/api/U/tester' ,  { withCredentials: true })
                .then((response) => {
                    console.log(response.data);
                    setLoggedInUser(response.data)
                })
                .catch((err) => {
                    console.log(err.message);
                })
    } , [])    

  return (
    <h1>
        {loggedInUser.name}
    </h1>
  )
}

export default Tester