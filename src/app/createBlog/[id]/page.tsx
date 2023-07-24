'use client'

import Link from "next/link"
import { useCallback, useEffect, useState, useMemo, useRef, LegacyRef } from "react"
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/auth'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { read } from "fs";
import { postBlog, updateBlog } from "../../firebase/queries";




export default function CreateBlog(){
    const router = useRouter();
    const [value, setValue] = useState("")
    const [title, setTitle] = useState("")
    const [delta, setDelta] = useState(Array<object>)
    const [resultDelta, setResultDelta] = useState("")
    const [jsonResult, setJSONResult] = useState("")
    
    const quillRef = useRef<HTMLElement>(null);

    const imageHandler = () => {
      console.log("Image uploaded")
    }

    const modules = useMemo(() => ({
      toolbar: {
        container: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean']
      ],
      handlers:{
        image: imageHandler
        }  
      }
    }), []) 
      
      

      
  

  const formats = useMemo(() => ([
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]), []) 

  const readOnlyModules = {
    toolbar: false
  }

  /*
  const handleBlogSubmit = (title: string, content: string) => {
    postBlog(title, content);
  }
  */
  
 
    

   

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

      const handleChange = (content: any, delta: any, source: any, editor: any) => {
        setValue(editor.getContents())
        setDelta(editor.getContents().ops);
        setResultDelta(editor.getContents().ops)
        let jsonString = JSON.stringify(editor.getContents())
        
        setJSONResult(jsonString)
        
        

       
        
      }

    return (
        <>
            <Link href = "/"><button>Back</button></Link>
            <h1>Create Blog Post</h1>
            <input placeholder="title" onChange={(e) => setTitle(e.target.value)}></input>
            <br/>
            <br/>
            <ReactQuill  theme = "snow" modules={modules} formats={formats} value = {value} onChange={handleChange}/>
            <br/>
            <br/>
            
           {/* <button onClick={() => handleBlogSubmit(title, jsonResult)}>Post Blog</button> */}
            
            <br/> 
            <br/>
            <h2>Preview Blog</h2>
            <h1>{title}</h1>
            <ReactQuill theme = "snow" modules = {readOnlyModules} value = {resultDelta} readOnly = {true} />

        </>
    )
}