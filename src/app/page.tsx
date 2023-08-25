"use client"
import { AiOutlinePlus } from 'react-icons/ai'
import { BsPersonCircle } from 'react-icons/bs'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from './firebase/auth'
import { useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {  postBlog, getBlogs } from './firebase/queries'
import { Dropdown, ListGroup } from 'react-bootstrap';
import "./page.css"
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function Home() {
  const router = useRouter();
  const [createdId, setCreatedId] = useState("")
  const [documentList, setDocumentList] = useState<any[]>([])
  const [toggleLogout, setToggleLogout] = useState(false)
  



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
    
    <div className="home">
      <div>
        <div className = "create-blog" onClick={handleBlogCreate}>
            <AiOutlinePlus color = "white" size = {70}/>

        </div>
      </div>
      <div className = "home-content">
        <div className = "home-bar">
            <DropdownButton variant="secondary" id = "options" title = {<BsPersonCircle size={40}/>}>
                <Dropdown.Item><Button variant="danger" onClick={handleLogout}>Logout</Button></Dropdown.Item>
            </DropdownButton>
        </div>
        
      
      <div className="home-documents-section">
          
      
        
          
          <div className='documents-container'>
            <div className='document-metrics'>
              <h2>Blogs</h2>
             
            </div>
            <ListGroup className = "documents-list">
              {documentList.map((document, index) => {
                return(
                  <ListGroup.Item key = {document.id} className='document' style = {{"backgroundColor": index % 2 == 0 ? "rgb(28,28,30)" : "black", "border":"none"}}>
                  
                        <Link href = {`/createBlog/${document.id}`}>{document.title != "" ? document.title : "Untitled Blog"}</Link>
                        <h2>{document.views}</h2>
                        <DropdownButton id = "options" title = "Options">
                          <Dropdown.Item><Button variant="danger">Delete Blog</Button></Dropdown.Item>
                        </DropdownButton>
              
                    
                    </ListGroup.Item>
                  
                  
                )
              })}
              </ListGroup>
          </div>
        </div>

      </div>
    </div>
  )
}
