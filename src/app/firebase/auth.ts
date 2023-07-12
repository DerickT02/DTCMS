import { app } from "./firebase";
import { createUserWithEmailAndPassword, getAuth, connectAuthEmulator, signInWithEmailAndPassword, signOut } from "firebase/auth"

const auth = getAuth(app);


export async function signUp(email: string, password: string){
    let result = createUserWithEmailAndPassword(auth, email, password).then(res => console.log(res)).catch(err => console.log(err.message))
    
}

export async function signIn(email: string, password: string){
    let result = await signInWithEmailAndPassword(auth, email, password).then(res => console.log(res)).catch(err =>  console.log(err.message))
   
} 

export async function logout(){
    let result = await signOut(auth).then(res => console.log("user logged out")).catch(err => console.log(err.message))
    
}