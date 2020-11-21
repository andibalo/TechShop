import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {

    const [email, setEmail] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URI,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)

        toast.success(`Confirmation link sent to ${email}`)

        window.localStorage.setItem('emailForRegistration', email)

        setEmail('')
    }

    const handleChange = (e) => {

        setEmail(e.target.value)
    }

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <form onSubmit={handleSubmit}>
                        <input type="email" className="form-control" value={email} onChange={e => handleChange(e)} placeholder="Email Address" />
                        <input type="submit" className="btn btn-raised my-3" value="Register" />
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Register
