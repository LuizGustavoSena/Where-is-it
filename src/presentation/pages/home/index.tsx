import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { EnumRoutes } from "@/domain/enums";
import { UnauthorizedError } from "@/domain/error/unauthorized-error";
import { CreateZipcodeModel } from "@/domain/models/create-zipcodes";
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
    const [valuesForm, setValuesForm] = useState<CreateZipcodeModel>(null);
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

    const generateZipcode = (params: Partial<CreateZipcodeModel>) => {
        if (params?.name)
            setValuesForm(el => ({ ...el, name: params.name }));

        if (params?.code)
            setValuesForm(el => ({ ...el, code: params.code }));
    }

    const handleCreateZipcode = () => {

    }

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
                        <label className={style.title}>Inserir novo rastreamento</label>
                        <label className={style.subTitle}>Nome:</label>
                        <input type="text" onChange={e => generateZipcode({ name: e.target.value })} />

                        <label className={style.subTitle}>Código:</label>
                        <input type="text" onChange={e => generateZipcode({ code: e.target.value })} />

                        <button onClick={() => handleCreateZipcode()}>Criar</button>
                    </div>
                </div>
            </div>
        </>

    )
};

export default Home;