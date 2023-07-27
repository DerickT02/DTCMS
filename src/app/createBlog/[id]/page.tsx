'use client'

import Link from "next/link"
import { useCallback, useEffect, useState, useMemo, useRef, LegacyRef } from "react"
import { useParams, useRouter } from 'next/navigation'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/auth'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { read } from "fs";
import { postBlog, updateBlog } from "../../firebase/queries";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase/queries";



export default function CreateBlog(){
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [value, setValue] = useState("")
    const [title, setTitle] = useState("")
    const [delta, setDelta] = useState(Array<object>)
    const [resultDelta, setResultDelta] = useState("")
    const [jsonResult, setJSONResult] = useState("")
    
    const quillRef = useRef<HTMLElement>(null);
    const contentRef = useRef(null);

    /*
    const imageHandler = () => {
      console.log("Image uploaded")
    }
    */

    const modules = useMemo(() => ({
      toolbar: {
        container: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean']
      ],
      /*
      handlers:{
        image: imageHandler
        }  
      
      */
        }
      }
    ), []) 
      
      

      
  

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
 // Store the previous jsonResult

 const [previousJsonResult, setPreviousJsonResult] = useState("");
  const [initialContentSet, setInitialContentSet] = useState(false);
  const [editorContent, setEditorContent] = useState(""); // State to manage content in the text editor

  // Set the initial value of the text editor with raw JSON content
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Blogs", id), (doc) => {
      console.log("Current data: ", doc.data());
      setTitle(doc.data()?.title);
      setJSONResult(doc.data()?.content);
      if (!initialContentSet) {
        setEditorContent(JSON.parse(doc.data()?.content)); // Set the raw JSON content initially
        setInitialContentSet(true);
      }
      setPreviousJsonResult(doc.data()?.content);
    });
  }, [id, initialContentSet]);

  // Handle the changes in the text editor and update the jsonResult state
  const handleChange = (content: any, delta: any, source: any, editor: any) => {
    setEditorContent(editor.getContents()); // Update the state representing the editor content
    setDelta(delta);
    setResultDelta(editor.getContents().ops);
    let jsonString = JSON.stringify(editor.getContents());
    setJSONResult(jsonString);
  };

  // Update the database only when the jsonResult state changes
  useEffect(() => {
    if (jsonResult !== "" && jsonResult !== previousJsonResult) {
      updateBlog(id, title, jsonResult);
      setPreviousJsonResult(jsonResult);
    }
  }, [jsonResult, previousJsonResult]);



      

    return (
        <>
            <Link href = "/"><button>Back</button></Link>
            <h1>Create Blog Post</h1>
            <input placeholder="title" onChange={(e) => setTitle(e.target.value)} value = {title}></input>
            <br/>
            <br/>
            <ReactQuill theme="snow" modules={modules} formats={formats} value={editorContent} onChange={handleChange} />
            <br/>
            <br/>
            
           {/* <button onClick={() => handleBlogSubmit(title, jsonResult)}>Post Blog</button> */}
            
            <br/> 
            <br/>
            <h2>Preview Blog</h2>
            <h1>{title}</h1>
            <ReactQuill theme = "snow" modules = {readOnlyModules} value = {editorContent} readOnly = {true} />

        </>
    )
}