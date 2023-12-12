import MakeCreateAccount from '@/main/factories/pages/create-account-factory';
import MakeLogin from '@/main/factories/pages/login-factory';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const MakeRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MakeLogin />} />
                <Route path="/createAccount" element={<MakeCreateAccount />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MakeRoutes;