import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './features/auth/pages/login.jsx'
import Register from './features/auth/pages/register.jsx'

function AppRoutes() {   
    return (
        <BrowserRouter>
             <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}
        

export default AppRoutes