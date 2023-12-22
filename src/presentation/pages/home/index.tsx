import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { EnumRoutes } from "@/domain/enums";
import { UnauthorizedError } from "@/domain/error/unauthorized-error";
import { ZipcodeProps } from "@/domain/models/get-zipcodes";
import Loading from "@/presentation/components/loading";
import Tracking from "@/presentation/components/tracking";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './index.module.css';

type Props = {
    getZipcodes: RemoteGetZipcodes
};

const Home: React.FC<Props> = ({ getZipcodes }) => {
    const [loading, setLoading] = useState(false);
    const [messageError, setmessageError] = useState('');
    const [zipcodes, setZipcodes] = useState<ZipcodeProps[]>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadZipcodes() {
            setLoading(true);
            setmessageError('');

            try {
                const response = await getZipcodes.execute();

                setZipcodes(response.zipcodes);
            } catch (error) {
                if (error instanceof UnauthorizedError)
                    navigate(EnumRoutes.LOGIN);

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
                        {messageError.length > 0 && (<label>{messageError}</label>)}
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