import { getFirestore, setDoc, doc, addDoc, collection } from 'firebase/firestore'
import { app } from './firebase'
import Router from "next/router";
/*
    Blog structure

    title: String
    thumbnailImage: String (url to the file)
    textContent: [Array]
    comments: [Array]
*/

const db = getFirestore(app)


export async function postBlog(){
    
   let result = await addDoc(collection(db, "Blogs"), {
        title: "",
        content: "",
    })
    
   return result
    
}

export async function updateBlog(id: string, title: string, content: string){
    const docRef = doc(db, "Blogs", id)
    await setDoc(docRef, {
        title: title,
        content: content
    }, {merge: true})
    .then((res) => {
        console.log("Blog added")
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
    
}


