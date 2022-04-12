import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/userAction'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ Email, setEmail ] = useState("")
  const [ Password, setPassword ] = useState("")
  const [ Name, setName ] = useState("")
  const [ ConfirmPassword, setConfirmPassword ] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault() // submit 시 새로고침이 되는 것을 방지
    
    if (Password !== ConfirmPassword) {
      return alert("비밀번호 확인이 잘못되었습니다")
    }

    const body = {
      name: Name,
      email: Email,
      password: Password
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          navigate('/login')
        } else {
          alert("ERROR")
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
        <label>Name</label>
        <input type="text" value={ Name } onChange={ onNameHandler } />
        <label>Email</label>
        <input type="email" value={ Email } onChange={ onEmailHandler } />
        <label>Password</label>
        <input type="password" value={ Password } onChange={ onPasswordHandler } />
        <label>Confirm Password</label>
        <input type="password" value={ ConfirmPassword } onChange={ onConfirmPasswordHandler } />
        
        <br/>
        <button>Register!</button>
      </form>
    </div>
  )
}

export default RegisterPage