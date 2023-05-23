import iconCross from '../assets/todo-app-main/images/icon-cross.svg'
import { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from './Context';
import { motion, AnimatePresence } from "framer-motion"
import { QuerySnapshot, QueryDocumentSnapshot, collection, 
   updateDoc, deleteDoc, doc, onSnapshot, 
   query, where, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';
import { Reorder } from 'framer-motion';

type Task = {
   title: string,
   completed: boolean,
   id:string,  
}[];

export default function List() {

   const { setElementWidth, userId } = useGlobalContext();
   const docRef = collection(db, `users/${userId}/tasks`); //docRef
   const elementOneRef = useRef<HTMLParagraphElement>(null!);  
   const elementTwoRef = useRef<HTMLDivElement>(null!);  
   const elementThreeRef = useRef<HTMLParagraphElement>(null!);  
   const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);  
   const [ tasks, setTasks ] = useState<Task>([]); //tasks
   const [ activeState, setActiveState ] = useState<string>('All');
   const [ completedTasksCount, setCompletedTasksCount ] = useState<number>(0)

   const mapQuerySnapshotToTasks = (querySnapshot: QuerySnapshot<any>): Task => {
      return ( 
         querySnapshot.docs.map((doc: QueryDocumentSnapshot<any>) => {
         const data = doc.data();
         return {  //return data compatible with data types specified in the tasks variable 
             title: data.title,
             completed: data.completed,
             id: doc.id,
               }
      })) 
   }
   // for resize of the footer

    useEffect(() => {
      const handleResize = ():void => {
      setWindowWidth(window.innerWidth);
      }
     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
   }, []);

   useEffect(() => {
    setElementWidth(elementTwoRef.current.getBoundingClientRect().width)
   }, [windowWidth]);

   // fetch data from firestore
    useEffect(() => {
      if(userId !== '') {
         // onSnapshot so I can get data update real-time
         const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
               const tasks = mapQuerySnapshotToTasks(querySnapshot);
               setTasks(tasks)              
         });
         return () => {
            unsubscribe();
         };
      }
      }, [userId])

   useEffect(() => {
         const unsubscribe = onSnapshot(query(docRef, where('completed', '==', false)), (q) => {
           setCompletedTasksCount(q.docs.length);
         });
         return unsubscribe;
   }, [docRef]);

   const handleDelete = async (id: string): Promise<void> => {
      await deleteDoc(doc(db, `users/${userId}/tasks/${id}`));
   }

   const handleComplete = async (id: string, completed: boolean): Promise<void> => {
      await updateDoc(doc(db, `users/${userId}/tasks/${id}`), {
          completed: !completed
      })
  }

   const handleFilter = async (val: boolean): Promise<void> => {
   setActiveState(val ? 'Completed' : 'Active')
   const q = query(docRef, where("completed", "==", val)) //get collection with respect to if completed is true or not
   const querySnapshot = await getDocs(q)
   const tasks = mapQuerySnapshotToTasks(querySnapshot) //fetch the document in the collection
   setTasks(tasks);
   // const tasks = querySnapshot.docs.map((doc) => {
   //    const data = doc.data();
   //    return {  //return data compatible with data types specified in the tasks variable 
   //        title: data.title,
   //        completed: data.completed,
   //        id: doc.id,
   //          }
   //        }); 
   }

   const handleClearCompleted = async (): Promise<void> => {
    const q = await getDocs(query(docRef, where("completed", "==", true))); //get the document so we can loop through
    q.forEach( async (doc) => { //loop through
      await deleteDoc(doc.ref);
    })
   }

   const handleFetchAll = async (): Promise<void> => {    
     setActiveState('All')  
     const querySnapshot = await getDocs(docRef);
     const tasks = mapQuerySnapshotToTasks(querySnapshot)
     setTasks(tasks); 
   }

   return (
      <div className='relative my-4'>
        <div className="list rounded-md bg-white shadow-lg w-full">
        <Reorder.Group
         axis="y"
         values={tasks} 
         layoutScroll
         onReorder={setTasks}>
         {
            tasks.length > 0 && ( //since tasks may be undefined 
               tasks.map(task => {
               const { id, title, completed } = task;
               return (
               <AnimatePresence key={id}>
               <Reorder.Item value={task}>
                 <motion.div 
                   initial={{ y: -30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: 30, opacity: 0 }}
                   transition={{ type:'spring', ease: 'easeOut', duration: .5, stiffness:'70'}}
                   className='single-item'>
                 <div className='py-4 px-4 flex justify-between items-center'>       
                 <div className='flex space-x-3'>
   
                 <label className='text-sm flex font-bold cursor-pointer list-text'>
                 <input type="checkbox"
                 checked={completed} 
                 onChange={() => handleComplete(id, completed)}
                 className="w-4 h-4 mr-3
                 focus:ring-0 rounded-full checked:bg-gradient-to-r
                 checked:from-pblue checked:to-ppurple 
                 checked:text-white"/>          
                  {
                    completed ? 
                    <s className='completed'>{title}</s> 
                    : <span>{title}</span>
                  }          
                 </label>
                 </div>
                 <img src={iconCross} alt='cancel' 
                 onClick={() => handleDelete(id)} //non-null example to prevent: "Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
                // Type 'undefined' is not assignable to type 'string'.ts(2345)" erorr
                 className='object-contain cursor-pointer'/>
                 </div> 
                 </motion.div>
                  </Reorder.Item>
                 </AnimatePresence>
               )}))}
        </Reorder.Group>
        </div>
        <footer>
         <div className='w-full footer-color font-bold py-4 px-4 flex justify-between'>
         <p ref={elementOneRef} className='text-xs'>
            {completedTasksCount} items left
          </p>
         <div ref={elementTwoRef} 
            className='flex-1 hidden md:flex justify-center items-center space-x-3 text-sm'>
               <p 
                 onClick={handleFetchAll}
                 className={`${activeState === 'All' ? 'active-color' : ''} list-footer-text cursor-pointer`}>All</p>  
               <p 
                  className={`${activeState === 'Active' ? 'active-color' : ''} list-footer-text cursor-pointer`}
                  onClick={() => handleFilter(false)}>
                  Active
               </p>  
               <p className={`${activeState === 'Completed' ? 'active-color' : ''} list-footer-text cursor-pointer`}
                  onClick={() => handleFilter(true)}>Completed
               </p>  
            </div>
             <p ref={elementThreeRef} className='list-footer cursor-pointer text-xs'
             onClick={handleClearCompleted}>Clear Completed</p>
                </div>
             <div className='list footer-color flex justify-center items-center md:hidden space-x-3 bg-white py-4 rounded-md shadow-lg'>
             <p className={`${activeState === 'All' ? 'active-color' : ''} list-footer-text`}
              onClick={handleFetchAll}>
              All
             </p>  
             <p className={`${activeState === 'Active' ? 'active-color' : ''} list-footer-text`}
              onClick={() => handleFilter(false)}>
               Active
             </p>  
             <p className={`${activeState === 'Completed' ? 'active-color' : ''} list-footer-text`}
              onClick={() => handleFilter(true)}>
              Completed
             </p>  
             </div>
           </footer>
         </div>
     )
}