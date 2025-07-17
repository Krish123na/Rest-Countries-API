import { createRoot } from "react-dom/client";
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router";
import Contact from "./components/Contact.jsx";
import Home from "./components/Home.jsx";
import Error from "./components/Error.jsx";
import CountryDetail from "./components/CountryDetail.jsx";

const router = createBrowserRouter([
     {
     path: '/',
     element: <App />,
     errorElement: <Error />,
     children: [
     {
      path: '/',
     element: <Home />,    
     },
     {
      path: '/contact',
     element: <Contact />,    
     },
     {
      path: '/:country',
     element: <CountryDetail />,    
     },
     ],
     }, 
])

const root = createRoot(document.querySelector('#root'))

root.render(<RouterProvider router={router} />)