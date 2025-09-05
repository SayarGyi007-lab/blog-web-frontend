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
import Protect from './pages/user/Protect.tsx'


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
        element: <Protect><CreatePost/></Protect> 
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



// import { StrictMode} from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
// import { Provider, useSelector } from 'react-redux';
// import { store } from './store.ts';
// import Main from './layouts/Main.tsx';
// import Login from './pages/user/Login.tsx';
// import Register from './pages/user/Register.tsx';
// import CreatePost from './pages/post/CreatePost.tsx';
// import GlobalFeed from './pages/post/GlobalFeed.tsx';

// import type { RootState } from './store.ts';

// // Protect routes that require login
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const userInfo = useSelector((state: RootState) => state.auth.userInfo);
//   if (!userInfo) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     children: [
//       {
//         index: true,
//         element: <Navigate to="/login" replace /> // Landing page
//       },
//       {
//         path: "/login",
//         element: <Login />
//       },
//       {
//         path: "/register",
//         element: <Register />
//       },
//       {
//         path: "/feed",
//         element: (
//           <ProtectedRoute>
//             <GlobalFeed />
//           </ProtectedRoute>
//         )
//       },
//       {
//         path: "/post/create",
//         element: (
//           <ProtectedRoute>
//             <CreatePost />
//           </ProtectedRoute>
//         )
//       }
//     ]
//   }
// ]);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>,
// );
