import { SetStorage } from '@/data/protocols/cache';
import { RemoteLoginAccount } from '@/data/usecases/remote-login-account';
import { EnumCache, EnumRoutes } from '@/domain/enums';
import { LoginAccountError } from '@/domain/error/login-account-error';
import { LoginAccountModel } from '@/domain/models/login-account';
import Main from '@/presentation/assets/images/mail.png';
import Padlock from '@/presentation/assets/images/padlock.png';
import Person from '@/presentation/assets/images/person.png';
import { Input } from '@/presentation/components/input';
import Loading from '@/presentation/components/loading';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ZodError, z } from 'zod';
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

    const validateLoginAccount = z.object({
        email: z.string().email({ message: 'Email inválido' }),
        password: z.string().min(8, { message: 'Senha precisa ter no mínimo 8 caracteres' })
    });

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

            validateLoginAccount.parse(account);

            const response = await login.auth(account);

            storage.set(EnumCache.AUTH_CACHE, response.token);

            setLoading(false);

            navigate(EnumRoutes.HOME);
        } catch (error) {
            if (!error || !error.message)
                return;

            setLoading(false);

            let message = 'Erro inesperado';

            if (error instanceof LoginAccountError)
                message = error.message;

            if (error instanceof ZodError) {
                message = '';
                error.issues.forEach(el => message += ` ${el.message}.`);
            }

            setMessageError(message);
        }
    }

    return (
        <div className={style.container}>
            <div className={style.boxSign}>
                <main className={style.main}>
                    <img className={style.img} src={Person} title='Login' />
                    <div className={style.title}>
                        Faça login para continuar
                    </div>
                    <div className={style.subTitle}>Por favor faça o login para acessar o site</div>
                    <Input placeholder='Email' type='text' iconSrc={Main} onChange={e => generateAccount({ email: e.target.value })} />
                    <Input placeholder='Senha' type='password' iconSrc={Padlock} className='margin-top: 5px' onChange={e => generateAccount({ password: e.target.value })} />
                    <button className={style.button} onClick={async () => await handleLogin()}>Acessar</button>
                </main>
                <footer className={style.footer}>
                    <div>Não tem uma conta?</div>
                    <Link className={style.createAccount} to={EnumRoutes.CREATE_ACCOUNT}>
                        Criar conta
                    </Link>
                </footer>
            </div>
            <Loading show={loading} />
        </div >
    )
};

export default Login;