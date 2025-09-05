import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import Main from './layouts/Main.tsx';
import Register from './pages/user/Register.tsx';
import Login from './pages/user/Login.tsx';
import CreatePost from './pages/post/CreatePost.tsx';
import GlobalFeed from './pages/post/GlobalFeed.tsx';
import type { JSX } from 'react/jsx-runtime';

// -------------------- PrivateRoute --------------------
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // adjust if you store auth differently
    setAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>; // optional: spinner
  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
};

// -------------------- Router --------------------
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <GlobalFeed />
      },
      {
        path: "post/create",
        element: <CreatePost />
      }
    ]
  }
]);

// -------------------- Render --------------------
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
