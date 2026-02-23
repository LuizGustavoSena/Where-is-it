import { RemoteCreateZipcode } from "@/data/usecases/remote-create-zipcode";
import { RemoteDeleteZipcode } from "@/data/usecases/remote-delete-zipcodes";
import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { EnumCache, EnumRoutes } from "@/domain/enums";
import { UnauthorizedError } from "@/domain/error/unauthorized-error";
import { CreateZipcodeModel } from "@/domain/models/create-zipcodes";
import { deleteZipcode, getRoutesParams, TrackingZipcode } from "@/domain/models/get-tracking-zipcodes";
import { ZipcodeProps } from "@/domain/models/get-zipcodes";
import { GetTrackingZipcode } from "@/domain/usecases/get-tracking-zipcode";
import { makeLocalStorageAdapter } from "@/main/factories/cache/local-storage-cache";
import LogoutIcon from '@/presentation/assets/images/logout.png';
import Trash from '@/presentation/assets/images/trash.png';
import Loading from "@/presentation/components/loading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './index.module.css';

type Props = {
    getZipcodes: RemoteGetZipcodes;
    deleteZipcode: RemoteDeleteZipcode;
    getTrackingZipcode: GetTrackingZipcode;
    createZipcode: RemoteCreateZipcode;
};

const Home: React.FC<Props> = ({ getZipcodes, getTrackingZipcode, createZipcode, deleteZipcode }) => {
    const [loading, setLoading] = useState(false);
    const [zipcodeIndex, setzipcodeIndex] = useState<number>();
    const [routes, setRoutes] = useState<TrackingZipcode>();
    const [messageError, setmessageError] = useState('');
    const [valuesForm, setValuesForm] = useState<CreateZipcodeModel>(null);
    const [zipcodes, setZipcodes] = useState<ZipcodeProps[]>(null);

    const navigate = useNavigate();

    const loadZipcodes = async () => {
        try {
            setLoading(true);

            const response = await getZipcodes.execute();

            setZipcodes(response.zipcodes);

            if (response.zipcodes?.length === 0) return;

            await getRoutes({
                code: response.zipcodes[0]?.code,
                index: 0
            });
        } catch (error) {
            if (error instanceof UnauthorizedError)
                navigate(EnumRoutes.LOGIN);

            setmessageError(error.message);
        } finally {
            setLoading(false);
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
                setValuesForm(null);

                setZipcodes(prev => [...prev, { ...valuesForm, id: '' }]);
            });
        } catch (error) {
            setmessageError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getRoutes = async ({ code, index }: getRoutesParams) => {
        try {
            setLoading(true);

            setRoutes(null);

            setzipcodeIndex(index);

            const response = await getTrackingZipcode.execute(code);

            setRoutes(response);
        } catch (error) {
            if (error instanceof UnauthorizedError)
                navigate(EnumRoutes.LOGIN);

            setmessageError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteZipcodeBycode = async ({ code, index }: deleteZipcode) => {
        try {
            setLoading(true);

            if (index === zipcodeIndex) {
                setRoutes(null);
                setzipcodeIndex(index);
            }

            if (zipcodes.length === 1)
                setzipcodeIndex(null);

            await deleteZipcode.execute(code);

            setZipcodes(prev => prev.filter((_, i) => i !== index));
        } catch (error) {
            if (error instanceof UnauthorizedError)
                navigate(EnumRoutes.LOGIN);

            setmessageError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const Logout = async () => {
        makeLocalStorageAdapter().set(EnumCache.AUTH_CACHE, undefined);
        navigate(EnumRoutes.LOGIN);
    }

    return (
        <>
            <Loading show={loading} />
            <div className={style.containerHome}>
                <div className={style.containerCreate}>
                    <div className={style.containerLogout}>
                        <div className={style.title}>Localize a sua encomenda</div>
                        <button className={`${style.button} ${style.logoutButton}`} onClick={async () => await Logout()}>
                            Sair
                            <img src={LogoutIcon} alt="Trash" />
                        </button>
                    </div>
                    <div>Por favor crie um nome e insira o código de sua encomenda</div>
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
                        <button className={style.buttonSearch} onClick={async () => await handleCreateZipcode()}>
                            Pesquisar
                        </button>
                    </div>
                </div>
                <div className={style.boxHome}>
                    <div className={style.left}>
                        {zipcodes && zipcodes.map((zipcode, index) => (
                            <div key={zipcode.id} className={`${style.nameZipcode} ${zipcodeIndex === index ? style.houverZipcode : ''}`}>
                                <button className={style.button} onClick={async () => await getRoutes({ code: zipcode.code, index })}>
                                    {zipcode.name}
                                </button>
                                <button className={style.button} onClick={async () => await deleteZipcodeBycode({ code: zipcode.code, index })}>
                                    <img src={Trash} alt="Trash" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className={style.right}>
                        <div className={style.title}>Histórico de rota da sua encomenda</div>
                        <div className={style.containerTracking}>
                            <div className={style.start}>{routes?.code ? 'Código de rastreamento' : ''}</div>
                            <div className={style.title}>{routes?.code}</div>
                            {routes?.routes && routes.routes.map((route, index) => (
                                <div key={index} className={style.trackBox}>
                                    <div className={style.description}>{route.description}</div>
                                    {route.start && <div className={style.start}>De {route.start}</div>}
                                    {route.end && <div>{`Para ${route.end}`}</div>}
                                    {route.date && <div className={style.date}>{route.date}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
};

export default Home;