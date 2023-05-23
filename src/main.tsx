import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
import './styles/list.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page';
import Context from './components/Context'
import LoginAuth from './login-auth';
import Todo from './Todo';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginAuth/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/my-todo",
    element: <Todo/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Context>
      <RouterProvider router={router}/>
    </Context>
    {/* <App /> */}
  </React.StrictMode>,
)
