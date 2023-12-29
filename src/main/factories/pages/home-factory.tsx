import Home from "@/presentation/pages/home";
import { memo } from "react";
import { makeRemoteCreateZipcode } from "../usecases/remote-create-zipcode";
import { makeRemoteGetZipcodes } from "../usecases/remote-get-zipcodes";

const MakeHome: React.FC = () => {
    return (
        <Home
            getZipcodes={makeRemoteGetZipcodes()}
            createZipcode={makeRemoteCreateZipcode()}
        />
    )
}

export default memo(MakeHome);
