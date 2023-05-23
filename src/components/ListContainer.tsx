import iconMoon from '../assets/todo-app-main/images/icon-moon.svg' 
import iconSun from '../assets/todo-app-main/images/icon-sun.svg'
import Input from './Input'
import List from './List'
import { useGlobalContext } from './Context'
import { useToggle } from './hooks/useToggle'
import { motion, AnimatePresence } from 'framer-motion'


export default function ListContainer() {

    const { theme } = useGlobalContext();
    const handleToggle = useToggle()

    return (
        <div className='mt-10'>
            <header className='flex justify-between'>
                <h1 className='font-bold text-3xl tracking-widest text-white'>TODO</h1>
                <div onClick={handleToggle}>
                {
                   theme === 'light' ?
                   <AnimatePresence>
                    <motion.div
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ type:'spring', ease: 'easeOut', duration: .05, stiffness:'70'}}
                    >
                    <img src={iconMoon} alt='moon' className='object-contain cursor-pointer'/>
                    </motion.div>
                   </AnimatePresence>
                   : 
                   <AnimatePresence>
                    <motion.div
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ type:'spring', ease: 'easeOut', duration: .5, stiffness:'70'}} >
                   <img src={iconSun} alt='moon' className='object-contain cursor-pointer'/>
                    </motion.div>
                   </AnimatePresence>
                }
                </div>
            </header>
            <Input/>
            <List/>
        </div>
    )
}
