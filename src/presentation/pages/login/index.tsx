import { SetStorage } from '@/data/protocols/cache';
import { RemoteLoginAccount } from '@/data/usecases/remote-login-account';
import { EnumCache, EnumRoutes } from '@/domain/enums';
import { LoginAccountError } from '@/domain/error/login-account-error';
import { LoginAccountModel } from '@/domain/models/login-account';
import Truck from '@/presentation/assets/images/TruckMobile.png';
import Loading from '@/presentation/components/loading';
import MiddleBox from '@/presentation/components/middle-box';
import React, { memo, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import style from './index.module.css';

type Props = {
    login: RemoteLoginAccount;
    storage: SetStorage
};

const Login: React.FC<Props> = ({ login, storage }) => {
    const [account, setAccount] = useState<LoginAccountModel>(null);
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState('');
    const navigate = useNavigate();

    const generateAccount = (props: Partial<LoginAccountModel>) => {
        if (props?.email)
            setAccount(el => ({ ...el, email: props.email }));

        if (props?.password)
            setAccount(el => ({ ...el, password: props.password }));
    }

    const handleLogin = async () => {
        setMessageError('');

        try {
            setLoading(true);

            const response = await login.auth(account);

            storage.set(EnumCache.AUTH_CACHE, response.token);

            setLoading(false);

            navigate(EnumRoutes.HOME);
        } catch (error) {
            setLoading(false);

            setMessageError(error instanceof LoginAccountError ?
                error.message : 'Erro inesperado');
        }
    }

    return (
        <>
            <MiddleBox>
                <div className={style.leftMenu}>
                    <label>Bem vindo de volta</label>

                    <div className={style.inputs}>
                        <input type="text" placeholder="Email" onChange={e => generateAccount({ email: e.target.value })} />
                        <input type="password" placeholder="Senha" onChange={e => generateAccount({ password: e.target.value })} />
                    </div>

                    {messageError.length > 0 && (
                        <p>{messageError}</p>
                    )}

                    <div className={style.buttons}>
                        <Link to={EnumRoutes.CREATE_ACCOUNT} className={style.createAccount}>
                            Criar conta
                        </Link>

                        <button onClick={async () => await handleLogin()} className={style.login}>
                            Entrar
                        </button>
                    </div>
                </div>
                <div className={style.rightMenu}>
                    <img src={Truck} alt='Truck' />
                </div>
            </MiddleBox>
            <Loading show={loading} />
        </>
    )
};

export default memo(Login);