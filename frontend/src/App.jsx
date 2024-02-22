import Header from './components/Header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Items from './pages/Items.jsx'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/items/:category" element={<Items />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
