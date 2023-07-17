"use client"

import Image from 'next/image'
import { logout } from './firebase/auth'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


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
      <Link href = "/createBlog"><button>Create Blog</button></Link>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
