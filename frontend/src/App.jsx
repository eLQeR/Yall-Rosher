import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Items from './pages/Items.jsx'
import ItemDetails from './pages/ItemDetails.jsx'
import Home from './pages/Home.jsx'
import Layout from './utils/Layout.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Profile from './pages/Profile.jsx'

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/items/:category',
                element: <Items />,
            },
            {
                path: '/item/:id',
                element: <ItemDetails />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/login',
                element: <SignIn />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
