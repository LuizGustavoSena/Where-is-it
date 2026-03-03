import Login from "@/presentation/pages/login";
import { makeRemoteLoginAccount } from "../usecases/remote-login-account";

const MakeLogin: React.FC = () => {
    return (
        <Login
            login={makeRemoteLoginAccount()} />
    );
}

export default MakeLogin;