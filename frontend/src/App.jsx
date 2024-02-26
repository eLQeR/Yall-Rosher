import Header from './components/Header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Items from './pages/Items.jsx'
import ItemDetails from './pages/ItemDetails.jsx'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/items/:category" element={<Items />} />
                <Route path="/item/:id" element={<ItemDetails />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
