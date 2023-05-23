import bglm from '../assets/todo-app-main/images/bg-mobile-light.jpg'
import bgld from '../assets/todo-app-main/images/bg-desktop-light.jpg'
import bgdm from '../assets/todo-app-main/images/bg-mobile-dark.jpg'
import bgdd from '../assets/todo-app-main/images/bg-desktop-dark.jpg'
import ListContainer from './ListContainer'
import { useGlobalContext } from './Context'
import { useRef } from 'react'


export default function Todo() {

   const elementRef = useRef<HTMLParagraphElement>(null!); 
   const { elementWidth, theme } = useGlobalContext()

   return (
    <main className="list-body min-h-screen relative">
    <div className='h-60'>
      {
        theme === 'dark' ? 
        <img src={bgdm} alt='hero background' className='lg:hidden w-full h-full object-cover'/>
        : <img src={bglm} alt='hero background' className='lg:hidden w-full h-full object-cover'/>               
      }
      {
        theme === 'dark' ? 
        <img src={bgdd} alt='hero background' className='hidden lg:block w-full h-full object-cover'/>
        : <img src={bgld} alt='hero background' className='hidden lg:block w-full h-full object-cover'/>
      }
    </div>
    <div className='absolute md:flex md:justify-center w-full top-0 left-0 px-6'>
    <div className='w-full md:w-[500px] lg:w-1/3'>
     <ListContainer/>
     <footer>
      <div className='px-4 flex justify-center items-center mt-8'>
        {
          elementWidth ? (
          <div style={{
            width: '54.04px'
          }}/> 
          ) : ''
        }
        <p style={{
            width: elementWidth ? `${elementWidth}px` : ''}} 
            ref={elementRef} className='footer-color flex-1 text-center text-xs'>
            Drag and drop to reorder list
        </p>
        {
           elementWidth ? ( <div style={{
            width: '84.23px'
          }}/> ) : ''
        }
        </div>
     </footer>
        </div>
    </div>
</main>
   )
}