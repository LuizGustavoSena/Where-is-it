import MakeCreateAccount from '@/main/factories/pages/create-account-factory';
import MakeHome from '@/main/factories/pages/home-factory';
import MakeLogin from '@/main/factories/pages/login-factory';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const MakeRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MakeLogin />} />
                <Route path="/createAccount" element={<MakeCreateAccount />} />
                <Route path="/home" element={<MakeHome />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MakeRoutes;