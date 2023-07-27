"use client"

import Image from 'next/image'
import { logout } from './firebase/auth'
import { useState, useEffect, use } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {  postBlog, db, getBlogs } from './firebase/queries'
import { collection, query, getDocs } from 'firebase/firestore'


export default function Home() {
  const router = useRouter();
  const [createdId, setCreatedId] = useState("")
  const [documentList, setDocumentList] = useState<any[]>([])
  

  const handleLogout = () => {
    
    logout();
    router.push("/loginForm")
    
}


   
const handleBlogCreate = () => {
  postBlog().then((res) => {
    console.log(res.id)
    router.push(`/createBlog/${res.id}`);
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

useEffect(() => {
  getBlogs().then(res => {
    setDocumentList(res)
  })
  
}, [])

console.log(documentList)

  return (
    
    <>  
      <button onClick={handleBlogCreate}>Create Blog</button>
      <button onClick={handleLogout}>Logout</button>

      <div>
        {documentList.map((document, index) => {
          return(
            <div key = {document.id}>
            <Link href = {`/createBlog/${document.id}`}>{document.title != "" ? document.title : "Untitled Blog"}</Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
