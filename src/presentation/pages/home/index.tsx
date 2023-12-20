import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { ZipcodeProps } from "@/domain/models/get-zipcodes";
import Loading from "@/presentation/components/loading";
import Tracking from "@/presentation/components/tracking";
import React, { useEffect, useState } from "react";
import style from './index.module.css';

type Props = {
    getZipcodes: RemoteGetZipcodes
};

const Home: React.FC<Props> = ({ getZipcodes }) => {
    const [loading, setLoading] = useState(false);
    const [messageError, setmessageError] = useState('');
    const [zipcodes, setZipcodes] = useState<ZipcodeProps[]>(null);

    useEffect(() => {
        async function loadZipcodes() {
            setLoading(true);
            setmessageError('');

            try {
                const response = await getZipcodes.getZipcode();

                setZipcodes(response.zipcodes);
            } catch (error) {
                setmessageError(error.message);
            }

            setLoading(false);
        };

        loadZipcodes();
    }, []);

    return (
        <>
            <Loading show={loading} />
            <div className={style.containerHome}>
                <div className={style.boxHome}>
                    <div className={style.left}>
                        <Tracking data={zipcodes} />
                    </div>
                    <div className={style.right}>
                        Hello right
                    </div>
                </div>
            </div>
        </>

    )
};

export default Home;