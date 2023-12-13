import CreateAccount from "@/presentation/pages/create-account";
import { memo } from "react";
import { makeRemoteAddAccount } from "../usecases/remote-add-account";

const MakeCreateAccount: React.FC = () => {
    return (
        <CreateAccount addAccount={makeRemoteAddAccount()} />
    );
}

export default memo(MakeCreateAccount);