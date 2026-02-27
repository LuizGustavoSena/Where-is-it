import { EnumRoutes } from '@/domain/enums';
import { CreateAccountError } from '@/domain/error/create-account-error';
import { CreateAccountModel } from '@/domain/models/create-account';
import { AddAccount } from '@/domain/usecases';
import AddUser from '@/presentation/assets/images/add-user.png';
import Main from '@/presentation/assets/images/mail.png';
import Padlock from '@/presentation/assets/images/padlock.png';
import User from '@/presentation/assets/images/user.png';
import { Input } from '@/presentation/components/input';
import Loading from '@/presentation/components/loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { ZodError, z } from 'zod';
import style from './index.module.css';

type Props = {
    addAccount: AddAccount;
};

const validateForm = z.object({
    email: z.email({ message: 'Email inválido' }),
    password: z.string().min(8, { message: 'Senha precisa ter no mínimo 8 caracteres' }),
    username: z.string().min(4, { message: 'Senha precisa ter no mínimo 4 caracteres' })
});

const CreateAccount: React.FC<Props> = ({ addAccount }) => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateAccountModel>(
        { resolver: zodResolver(validateForm) }
    );

    const handleCreateAccount: SubmitHandler<CreateAccountModel> = async (data) => {
        try {
            setLoading(true);

            await addAccount.add(data);

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
        }
    };

    return (
        <>
            <div className={style.container}>
                <div className={style.boxSign}>
                    <main className={style.main}>
                        <img className={style.img} src={AddUser} title='Login' />
                        <div className={style.title}>
                            Crie sua conta
                        </div>
                        <div className={style.subTitle}>Preencha os dados abaixo para começar</div>
                        <form onSubmit={handleSubmit(handleCreateAccount)} className={style.form}>
                            <Input
                                placeholder='Nome de usuário'
                                type='text'
                                iconSrc={User}
                                error={errors.username?.message}
                                {...register('username')}
                            />
                            <Input
                                placeholder='Email'
                                type='text'
                                iconSrc={Main}
                                error={errors.email?.message}
                                {...register('email')}
                            />
                            <Input
                                placeholder='Senha'
                                type='password'
                                iconSrc={Padlock}
                                className='margin-top: 5px'
                                error={errors.password?.message}
                                {...register('password')}
                            />
                            <button className={style.button} type='submit'>Acessar</button>
                        </form>
                    </main>
                    <footer className={style.footer}>
                        <div>Já possui cadastro?</div>
                        <Link className={style.createAccount} to={EnumRoutes.LOGIN}>
                            Fazer login
                        </Link>
                    </footer>
                </div>
                <Loading show={loading} />
            </div >
        </>
    )
}

export default CreateAccount;