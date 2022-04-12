import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  let navigate = useNavigate()
  useEffect(() => {
    axios.get('/api/hello').then(response => console.log(response.data))
  }, [])

  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          navigate('/login')
        }
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
    width: '100%', 'height': '100vh' }}>
      <form style={{display: 'flex', flexDirection: 'column'}}>
        <h1>LandingPage</h1>
        <button onClick={ onClickHandler }>Logout</button>
      </form>
    </div>
  )
}

export default LandingPage