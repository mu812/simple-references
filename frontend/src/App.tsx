import './App.css'

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'; 
import Tasks from './pages/Tasks'; 
import Landing from './pages/Landing';
import Layout from './pages/Layout';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); 

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} >
    <Route index element={<Landing />} />
    <Route path="tasks" element={<Tasks />} />
  </Route>
)); 


export default function App() {
  return <Theme>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Theme>
}

