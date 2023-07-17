'use client'

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/auth'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { read } from "fs";




export default function CreateBlog(){
    const router = useRouter();
    const [value, setValue] = useState("")
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const readOnlyModules = {
    toolbar: false
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

      const handleChange = (content: any, delta: any, source: any, editor: any) => {
        setValue(editor.getContents())
        console.log(value)
      }

    return (
        <>
            <Link href = "/"><button>Back</button></Link>
            <h1>Create Blog Post</h1>
            <ReactQuill theme = "snow" modules={modules} formats={formats} value = {value} onChange={handleChange}/>
            <ReactQuill theme = "snow" modules = {readOnlyModules} value = {value} readOnly = {true} />

        </>
    )
}