import { getFirestore, setDoc, doc, addDoc, collection, query, getDocs } from 'firebase/firestore'
import { app } from './firebase'
import Router from "next/router";
/*
    Blog structure

    title: String
    thumbnailImage: String (url to the file)
    textContent: [Array]
    comments: [Array]
*/

export const db = getFirestore(app)


export async function postBlog(){
    
   let result = await addDoc(collection(db, "Blogs"), {
        title: "",
        content: "",
    })
    
   return result
    
}

export const getBlogs = async () => {
    let result: any[] = [];
    const q = query(collection(db, "Blogs"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let title = doc.data().title
        let content = doc.data().content
        let views = doc.data().views
        let document = {title: title, content: content, views: views, id: doc.id}
        result = [...result, document]
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


