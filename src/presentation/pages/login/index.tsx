import { SetStorage } from '@/data/protocols/cache';
import { RemoteLoginAccount } from '@/data/usecases/remote-login-account';
import { LoginAccountError } from '@/domain/error/login-account-error';
import { LoginAccountModel } from '@/domain/models/login-account';
import Truck from '@/presentation/assets/images/TruckMobile.png';
import Loading from '@/presentation/components/loading';
import MiddleBox from '@/presentation/components/middle-box';
import React, { memo, useState } from "react";
import { Link, redirect } from 'react-router-dom';
import style from './index.module.css';

type Props = {
    login: RemoteLoginAccount;
    storage: SetStorage
};

const Login: React.FC<Props> = ({ login, storage }) => {
    const [account, setAccount] = useState<LoginAccountModel>(null);
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState('');

    const generateAccount = (props: Partial<LoginAccountModel>) => {
        if (props?.email)
            setAccount(el => ({ ...el, email: props.email }));

        if (props?.password)
            setAccount(el => ({ ...el, password: props.password }));
    }

    const handleLogin = async () => {
        try {
            setLoading(true);

            const response = await login.auth(account);

            storage.set('token', response.token);

            setLoading(false);

            redirect('/home');
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
                        <Link to="createAccount" className={style.createAccount}>
                            Criar conta
                        </Link>

                        <button onClick={() => handleLogin()} className={style.login}>
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