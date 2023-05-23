import TodoMain from './components/Todo'
import  { useGlobalContext } from './components/Context'
import { auth } from './components/firebaseConfig'
import { Navigate } from 'react-router-dom'

export default function Todo() {

  const { theme } = useGlobalContext()

    return (
     (auth.currentUser !== null) ? ( 
      <div className={`theme-${theme}`}>
      <TodoMain/>
      </div>
     ):
    <Navigate to='/' replace={true}/>
    )
}