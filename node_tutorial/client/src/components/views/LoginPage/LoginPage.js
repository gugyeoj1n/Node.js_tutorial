import { axios } from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/userAction'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [ Email, setEmail ] = useState("")
  const [ Password, setPassword ] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault() // submit 시 새로고침이 되는 것을 방지

    const body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/')
        } else {
          alert('ERROR')
        }
      })

  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', 'height': '100vh'
    }}>
      <form style={{
        display: 'flex', flexDirection: 'column'
        }}
        onSubmit={ onSubmitHandler }
      >
        <label>Email</label>
        <input type="email" value={ Email } onChange={ onEmailHandler } />
        <label>Password</label>
        <input type="password" value={ Password } onChange={ onPasswordHandler } />
        <br/>
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginPage