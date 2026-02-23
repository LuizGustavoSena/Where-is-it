import Home from "@/presentation/pages/home";
import { memo } from "react";
import { makeRemoteCreateZipcode } from "../usecases/remote-create-zipcode";
import { makeRemoteGetTrackingZipcode } from "../usecases/remote-get-tracking-zipcodes";
import { makeRemoteGetZipcodes } from "../usecases/remote-get-zipcodes";

const MakeHome: React.FC = () => {
    return (
        <Home
            getZipcodes={makeRemoteGetZipcodes()}
            getTrackingZipcode={makeRemoteGetTrackingZipcode()}
            createZipcode={makeRemoteCreateZipcode()}
        />
    )
}

export default memo(MakeHome);
