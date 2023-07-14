"use client"

import { logout, signIn, signUp } from '../firebase/auth'
import './page.css'
import { onAuthStateChanged } from 'firebase/auth'
import Router from 'next/router'
import { auth } from '../firebase/auth'
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'


export default function LoginForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [buttonText, setButtonText] = useState("Login")
    const [toggleLogin, setToggleLogin] = useState(true)
    const [haveAccount, setHaveAccount] = useState("Don't have an account")
    const [loginAction, setLoginAction] = useState("Sign Up")

    const router = useRouter();

    const handleInputChange = (inputHandler: Dispatch<SetStateAction<string>>,e: ChangeEvent<HTMLInputElement>) => {
        console.log("email", email)
        console.log("password", password)
        inputHandler(e.target.value);
    }

    const toggleSignInType = () => {
        if(toggleLogin){
            setHaveAccount("Have an account")
            setLoginAction("Sign In")
            setButtonText("Sign Up")
            setToggleLogin(false)
        }
        else if(!toggleLogin){
            setHaveAccount("Don't have an account")
            setLoginAction("Sign Up")
            setButtonText("Login")
            setToggleLogin(true)
        }
    }

    const handleLogin = () => {
        if(toggleLogin){
            signIn(email, password)
        }
        else if(!toggleLogin){
            signUp(email, password)
        }
    }

    const handleLogout = () => {
        logout()
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if(!user){
            console.log("Not logged In")
          }
          else{
           router.push("/")
          }
        })
      }, [])

  

    return(
        <>
        
        <input value={email} onChange={(e) => handleInputChange(setEmail, e)}/>
        <input value={password} onChange={(e) => handleInputChange(setPassword, e)}/>
        <button onClick={handleLogin}>{buttonText}</button>
        <p>{haveAccount} <span onClick = {toggleSignInType}>{loginAction}</span></p>
       
        </>
    )
}