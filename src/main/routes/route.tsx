import { EnumRoutes } from '@/domain/enums';
import MakeCreateAccount from '@/main/factories/pages/create-account-factory';
import MakeLogin from '@/main/factories/pages/login-factory';
import MakeHome from '@/presentation/pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../proxies/private-route';

const MakeRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={EnumRoutes.LOGIN} element={<MakeLogin />} />
                <Route path={EnumRoutes.CREATE_ACCOUNT} element={<MakeCreateAccount />} />
                <Route path={EnumRoutes.HOME} element={<PrivateRoute Component={<MakeHome />} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MakeRoutes;