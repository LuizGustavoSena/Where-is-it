import Login from "@/presentation/pages/login";
import { memo } from "react";
import { makeLocalStorageAdapter } from "../cache/local-storage-cache";
import { makeRemoteLoginAccount } from "../usecases/remote-login-account";

const MakeLogin: React.FC = () => {
    return (
        <Login
            login={makeRemoteLoginAccount()}
            storage={makeLocalStorageAdapter()} />
    );
}

export default memo(MakeLogin);