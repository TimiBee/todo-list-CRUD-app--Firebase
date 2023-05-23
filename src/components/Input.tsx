import { useState } from "react"
import { useGlobalContext } from "./Context";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore"; 
import { db } from "./firebaseConfig";

export default function Input() {
    
    const { userId } = useGlobalContext()
    const [ title, setTitle ] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(title !== '') {
            try {
                await addDoc(collection(db, 'users', userId, 'tasks'), {
                     title,
                     completed: false,
                 })
                setTitle('')
                console.log('Task successfully added')
            }
            catch(e) {
                console.log('Unsuccessful')
            }
          }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Create a new todo...'
            className="input pl-6 w-full h-12 rounded-lg font-bold mt-10 outline-none"/>
        </form>
    )
}