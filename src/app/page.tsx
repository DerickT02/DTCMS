"use client"

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import { logout } from './firebase/auth'
import { useState, useEffect, use } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {  postBlog, db, getBlogs } from './firebase/queries'
import { collection, query, getDocs } from 'firebase/firestore'
import { Dropdown, ListGroup } from 'react-bootstrap';
import "./page.css"
import DropdownButton from 'react-bootstrap/DropdownButton';


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
  require ('bootstrap/dist/js/bootstrap.js')
  
}, [])

console.log(documentList)

  return (
    
    <>  
      <Button variant = "primary" onClick={handleBlogCreate}>Create Blog</Button>
      <Button variant = "danger" onClick={handleLogout}>Logout</Button>

     
       
        
        <div className='documents-container'>
          <div className='document-metrics'>
            <h2>Blogs</h2>
            <h3>Views</h3>
          </div>
          <ListGroup className = "documents-list">
            {documentList.map((document, index) => {
              return(
                <ListGroup.Item key = {document.id} className='document'>
                    
                      
                      <Link href = {`/createBlog/${document.id}`}>{document.title != "" ? document.title : "Untitled Blog"}</Link>
                      <p>1</p>
                      <DropdownButton id = "options" title = "Options">
                        <Dropdown.Item>Hello</Dropdown.Item>
                      </DropdownButton>
                      
                  
                  </ListGroup.Item>
                
                
              )
            })}
            </ListGroup>
        </div>
      
    </>
  )
}
