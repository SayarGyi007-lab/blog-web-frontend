import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import Main from './layouts/Main.tsx'
import Register from './pages/user/Register.tsx'
import Login from './pages/user/Login.tsx'
import CreatePost from './pages/post/CreatePost.tsx'
import GlobalFeed from './pages/post/GlobalFeed.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        index: true,
        element: <GlobalFeed/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/post/create",
        element: <CreatePost/>
      }
     
    ]
    
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
