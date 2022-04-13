import axios from 'axios'
import react, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authUser } from '../_actions/userAction'

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(authUser()).then(response => {
                console.log(response)
            })
        })

        return <SpecificComponent />
    }

    return AuthenticationCheck
}