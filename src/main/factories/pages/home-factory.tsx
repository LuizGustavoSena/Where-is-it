import Home from "@/presentation/pages/home";
import { memo } from "react";
import { makeRemoteGetZipcodes } from "../usecases/remote-get-zipcodes";

const MakeHome: React.FC = () => {
    return (
        <Home getZipcodes={makeRemoteGetZipcodes()} />
    )
}

export default memo(MakeHome);
