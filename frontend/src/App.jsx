import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Items from './pages/Items.jsx';
import ItemDetails from './pages/ItemDetails.jsx';
import Home from './pages/Home.jsx';
import Layout from './utils/Layout.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'items/:category',
        element: <Items />,
      },
      {
        path: 'item/:id',
        element: <ItemDetails />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <SignIn />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
