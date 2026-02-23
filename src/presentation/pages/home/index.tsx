import { RemoteCreateZipcode } from "@/data/usecases/remote-create-zipcode";
import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { EnumRoutes } from "@/domain/enums";
import { UnauthorizedError } from "@/domain/error/unauthorized-error";
import { CreateZipcodeModel } from "@/domain/models/create-zipcodes";
import { ZipcodeProps } from "@/domain/models/get-zipcodes";
import { GetTrackingZipcode } from "@/domain/usecases/get-tracking-zipcode";
import Loading from "@/presentation/components/loading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './index.module.css';

type Props = {
    getZipcodes: RemoteGetZipcodes;
    getTrackingZipcode: GetTrackingZipcode;
    createZipcode: RemoteCreateZipcode;
};

const Home: React.FC<Props> = ({ getZipcodes, getTrackingZipcode, createZipcode }) => {
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

        if (params?.code)
            setValuesForm(el => ({ ...el, code: params.code }));
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
                <div className={style.containerCreate}>
                    <label className={style.title}>Localize a sua encomenda</label>
                    <label>Por favor crie um nome e insira o código de sua encomenda</label>
                    <div className={style.containerInputs}>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Apelido para o pacote"
                            onChange={e => generateZipcode({ name: e.target.value })}
                            value={valuesForm?.name || ''}
                        />
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Código do pacote"
                            onChange={e => generateZipcode({ code: e.target.value })}
                            value={valuesForm?.code || ''}
                        />
                        <button className={style.button} onClick={async () => await handleCreateZipcode()}>Pesquisar</button>
                    </div>
                </div>
                <div className={style.boxHome}>

                    {/* <div className={style.left}>
                        {messageError.length > 0 && (<label>{messageError}</label>)}
                        <Tracking data={zipcodes} getTrackingZipcode={getTrackingZipcode} />
                    </div>
                    <div className={style.right}>

                    </div> */}
                </div>
            </div>
        </>

    )
};

export default Home;