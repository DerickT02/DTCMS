"use client"

import Image from 'next/image'
import { logout } from './firebase/auth'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { postBlog } from './firebase/queries'


export default function Home() {
  const router = useRouter();
  const [createdId, setCreatedId] = useState("")
  

  const handleLogout = () => {
    
    logout();
    router.push("/loginForm")
    
}


   
const handleBlogCreate = () => {
  postBlog().then((res) => {
    setCreatedId(res.id);
    console.log(createdId)
    router.push(`/createBlog/${createdId}`);
  })
    
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
      <button onClick={handleBlogCreate}>Create Blog</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
