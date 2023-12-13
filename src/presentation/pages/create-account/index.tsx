import { CreateAccountError } from '@/domain/error/create-account-error';
import { CreateAccountModel } from '@/domain/models/create-account';
import { AddAccount } from '@/domain/usecases';
import Truck from '@/presentation/assets/images/TruckMobile.png';
import MiddleBox from "@/presentation/components/middle-box";
import { useState } from 'react';
import { Link, redirect } from "react-router-dom";
import style from './index.module.css';

type Props = {
    addAccount: AddAccount;
};

const CreateAccount: React.FC<Props> = ({ addAccount }) => {
    const [account, setAccount] = useState<CreateAccountModel>();
    const [messageError, setMessageError] = useState('');

    const generateAccount = (props: Partial<CreateAccountModel>) => {
        if (props?.email)
            setAccount(el => ({ ...el, email: props.email }));

        if (props?.password)
            setAccount(el => ({ ...el, password: props.password }));

        if (props?.username)
            setAccount(el => ({ ...el, username: props.username }));
    };

    const handleCreateAccount = async () => {
        try {
            await addAccount.add(account);

            redirect('/');
        } catch (error) {
            if (error instanceof CreateAccountError)
                setMessageError('Erro ao criar conta');
        }
    };

    return (
        <MiddleBox>
            <div className={style.leftMenu}>
                <label>Novo por aqui?</label>
                {JSON.stringify(account)}

                <div className={style.inputs}>
                    <input type="text" placeholder="Usuário" required
                        onChange={e => generateAccount({ username: e.target.value })}
                    />
                    <input type="text" placeholder="Email" required
                        onChange={e => generateAccount({ email: e.target.value })}
                    />
                    <input type="password" placeholder="Senha" required
                        onChange={e => generateAccount({ password: e.target.value })}
                    />
                </div>

                <div className={style.buttons}>
                    <Link to="/" className={style.createAccount}>
                        Fazer login
                    </Link>

                    <button className={style.login} onClick={() => handleCreateAccount()}>
                        Cadastrar
                    </button>
                </div>
            </div>
            <div className={style.rightMenu}>
                <img src={Truck} alt='Truck' />
            </div>
        </MiddleBox>
    )
}

export default CreateAccount;