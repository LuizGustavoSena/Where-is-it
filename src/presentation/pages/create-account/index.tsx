import { EnumRoutes } from '@/domain/enums';
import { CreateAccountError } from '@/domain/error/create-account-error';
import { CreateAccountModel } from '@/domain/models/create-account';
import { AddAccount } from '@/domain/usecases';
import Truck from '@/presentation/assets/images/TruckMobile.png';
import Loading from '@/presentation/components/loading';
import MiddleBox from "@/presentation/components/middle-box";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ZodError, z } from 'zod';
import style from './index.module.css';

type Props = {
    addAccount: AddAccount;
};

const CreateAccount: React.FC<Props> = ({ addAccount }) => {
    const [account, setAccount] = useState<CreateAccountModel>();
    const [messageError, setMessageError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = z.object({
        email: z.string().email({ message: 'Email inválido' }),
        password: z.string().min(8, { message: 'Senha precisa ter no mínimo 8 caracteres' }),
        username: z.string({ required_error: 'Usuário é necessário' })
    });

    const generateAccount = (props: Partial<CreateAccountModel>) => {
        if (props?.email)
            setAccount(el => ({ ...el, email: props.email }));

        if (props?.password)
            setAccount(el => ({ ...el, password: props.password }));

        if (props?.username)
            setAccount(el => ({ ...el, username: props.username }));
    };

    const handleCreateAccount = async () => {
        setMessageError('');

        try {
            setLoading(true);

            validateForm.parse(account);

            await addAccount.add(account);

            setLoading(false);

            navigate(EnumRoutes.LOGIN);
        } catch (error) {
            if (!error || !error.message)
                return;

            setLoading(false);

            let message = 'Erro inesperado';

            if (error instanceof CreateAccountError)
                message = error.message;

            if (error instanceof ZodError) {
                message = '';
                error.issues.forEach(el => message += ` ${el.message}.`);
            }

            setMessageError(message);
        }
    };

    return (
        <>
            <MiddleBox>
                <div className={style.leftMenu}>
                    <label>Novo por aqui?</label>
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

                    {messageError.length > 0 && (
                        <p>{messageError}</p>
                    )}

                    <div className={style.buttons}>
                        <Link to="/" className={style.createAccount}>
                            Fazer login
                        </Link>

                        <button className={style.login} onClick={async () => await handleCreateAccount()}>
                            Cadastrar
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
}

export default CreateAccount;