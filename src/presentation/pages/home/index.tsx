import { RemoteCreateZipcode } from "@/data/usecases/remote-create-zipcode";
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
    getZipcodes: RemoteGetZipcodes;
    createZipcode: RemoteCreateZipcode;
};

const Home: React.FC<Props> = ({ getZipcodes, createZipcode }) => {
    const [loading, setLoading] = useState(false);
    const [messageError, setmessageError] = useState('');
    const [valuesForm, setValuesForm] = useState<CreateZipcodeModel>(null);
    const [zipcodes, setZipcodes] = useState<ZipcodeProps[]>(null);
    const navigate = useNavigate();

    const loadZipcodes = async () => {
        try {
            const response = await getZipcodes.execute();

            setZipcodes(response.zipcodes);
        } catch (error) {
            if (error instanceof UnauthorizedError)
                navigate(EnumRoutes.LOGIN);

            setZipcodes(null);

            setmessageError(error.message);
        }
    }

    useEffect(() => {
        setmessageError('');

        setLoading(true);

        loadZipcodes();

        setLoading(false);
    }, []);

    const generateZipcode = (params: Partial<CreateZipcodeModel>) => {
        if (params?.name)
            setValuesForm(el => ({ ...el, name: params.name }));

        if (params?.zipcode)
            setValuesForm(el => ({ ...el, zipcode: params.zipcode }));
    }

    const handleCreateZipcode = async () => {
        setLoading(true);

        try {
            await createZipcode.execute(valuesForm);

            setTimeout(async () => {
                await loadZipcodes();

                setValuesForm(null);

                setLoading(false);
            }, 3000);
        } catch (error) {
            setLoading(false);

            setmessageError(error.message);
        }
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
                        <input
                            type="text"
                            onChange={e => generateZipcode({ name: e.target.value })}
                            value={valuesForm?.name || ''}
                        />

                        <label className={style.subTitle}>Código:</label>
                        <input
                            type="text"
                            onChange={e => generateZipcode({ zipcode: e.target.value })}
                            value={valuesForm?.zipcode || ''}
                        />

                        <button onClick={async () => await handleCreateZipcode()}>Criar</button>
                    </div>
                </div>
            </div>
        </>

    )
};

export default Home;