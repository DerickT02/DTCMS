"use client"

import Image from 'next/image'
import { logout } from './firebase/auth'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/auth'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    
    logout();
    router.push("/loginForm")
    
}


   
     

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if(user != null){
      console.log(user)
    }
    else{
     router.push("/loginForm")
    }
  })
}, [])

  return (
    
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
