import { EnumCache } from "@/domain/enums";
import { Navigate } from "react-router-dom";
import { makeLocalStorageAdapter } from "../factories/cache/local-storage-cache";

type Props = {
    Component: JSX.Element;
};

const PrivateRoute: React.FC<Props> = ({ Component }) => {
    const token = makeLocalStorageAdapter().get(EnumCache.AUTH_CACHE);

    return token ? Component : <Navigate to="/login" />;
}

export default PrivateRoute;