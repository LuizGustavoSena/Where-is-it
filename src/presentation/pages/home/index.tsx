import { RemoteCreateZipcode } from "@/data/usecases/remote-create-zipcode";
import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { EnumRoutes } from "@/domain/enums";
import { UnauthorizedError } from "@/domain/error/unauthorized-error";
import { CreateZipcodeModel } from "@/domain/models/create-zipcodes";
import { TrackingZipcode } from "@/domain/models/get-tracking-zipcodes";
import { ZipcodeProps } from "@/domain/models/get-zipcodes";
import { GetTrackingZipcode } from "@/domain/usecases/get-tracking-zipcode";
import Trash from '@/presentation/assets/images/trash.png';
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
    const [zipcodeIndex, setzipcodeIndex] = useState(0);
    const [routes, setRoutes] = useState<TrackingZipcode>();
    const [messageError, setmessageError] = useState('');
    const [valuesForm, setValuesForm] = useState<CreateZipcodeModel>(null);
    const [zipcodes, setZipcodes] = useState<ZipcodeProps[]>(null);
    const navigate = useNavigate();

    const loadZipcodes = async () => {
        try {
            // const response = await getZipcodes.execute();
            const response = {
                zipcodes: [
                    {
                        id: "9acda250-57d1-817f-de2f33c85b68",
                        email: "barbara@gmail.com",
                        name: "Teclado magnético",
                        code: "NN085351155BR"
                    }, {
                        id: "9acda250-587c-47d1-817ff33c85b68",
                        email: "barbara@gmail.com",
                        name: "Projetor 4K",
                        code: "NN085351155BR"
                    }, {
                        id: "9a250-587c-47d1-817f-de2f33c85b68",
                        email: "barbara@gmail.com",
                        name: "Galaxy S26 Ultra 1TB",
                        code: "NN085351155BR"
                    }, {
                        id: "9acda250-587c-4-817f-de2f33c85b68",
                        email: "barbara@gmail.com",
                        name: "Robo aspirador Xiaomi S20 Plus",
                        code: "NN085351155BR"
                    },
                ]
            }

            const routes = {
                code: "NN085351155BR",
                routes: [
                    {
                        start: "MATAO",
                        date: "20/02/2026 15:04",
                        end: "",
                        description: "Objeto entregue ao destinatário"
                    },
                    {
                        start: "MATAO",
                        date: "20/02/2026 10:13",
                        end: "",
                        description: "Objeto saiu para entrega ao destinatário"
                    },
                    {
                        start: "RIBEIRAO PRETO",
                        end: "Matao",
                        date: "19/02/2026 08:16",
                        description: "Objeto em transferência - por favor aguarde"
                    },
                    {
                        start: "VALINHOS",
                        end: "Ribeirao Preto",
                        date: "13/02/2026 15:33",
                        description: "Objeto em transferência - por favor aguarde"
                    },
                    {
                        start: "VALINHOS",
                        date: "13/02/2026 15:33",
                        end: "",
                        description: "Saída do Centro Internacional"
                    },
                    {
                        start: "VALINHOS",
                        date: "13/02/2026 08:59",
                        end: "",
                        description: "Objeto recebido pelos Correios do Brasil"
                    },
                    {
                        start: null,
                        date: "09/02/2026 21:47",
                        end: "",
                        description: "Objeto postado"
                    },
                    {
                        start: "VALINHOS",
                        date: "09/02/2026 10:27",
                        end: "",
                        description: "Análise concluída - importação autorizada"
                    },
                    {
                        start: "VALINHOS",
                        date: "07/02/2026 19:12",
                        end: "",
                        description: "Informações enviadas para análise da autoridade aduaneira/órgãos anuentes"
                    }
                ]
            }

            setZipcodes(response.zipcodes);
            setRoutes(routes)
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
                    <div className={style.title}>Localize a sua encomenda</div>
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
                        <button className={style.buttonSearch} onClick={async () => await handleCreateZipcode()}>Pesquisar</button>
                    </div>
                </div>
                <div className={style.boxHome}>
                    <div className={style.left}>
                        {/* {messageError.length > 0 && (<label>{messageError}</label>)}
                        <Tracking data={zipcodes} getTrackingZipcode={getTrackingZipcode} /> */}
                        {zipcodes && zipcodes.map((zipcode, index) => (
                            <div key={zipcode.id} className={`${style.nameZipcode} ${zipcodeIndex === index ? style.houverZipcode : ''}`}>
                                <button className={style.button}>
                                    {zipcode.name}
                                </button>
                                <button className={style.button}>
                                    <img src={Trash} alt="Trash" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className={style.right}>
                        <div className={style.title}>Histórico de rota da sua encomenda</div>
                        <div className={style.containerTracking}>
                            <div className={style.start}>Código de rastreamento</div>
                            <div className={style.title}>{routes?.code}</div>
                            {routes?.routes && routes.routes.map((route, index) => (
                                <div key={index} className={style.trackBox}>
                                    <div className={style.description}>{route.description}</div>
                                    {route.start && <div className={style.start}>De {route.start}</div>}
                                    {route.end && <div className={style.end}>{`Para ${route.end}`}</div>}
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