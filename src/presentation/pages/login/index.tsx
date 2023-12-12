import Truck from '@/presentation/assets/images/TruckMobile.png';
import MiddleBox from '@/presentation/components/middle-box';
import React, { memo } from "react";
import { Link } from 'react-router-dom';
import style from './index.module.css';

const Login: React.FC = () => {
    return (
        <MiddleBox>
            <div className={style.leftMenu}>
                <label>Bem vindo de volta</label>

                <div className={style.inputs}>
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Senha" />

                </div>

                <div className={style.buttons}>
                    <Link to="createAccount" className={style.createAccount}>
                        Criar conta
                    </Link>

                    <Link to="/" className={style.login}>
                        Entrar
                    </Link>
                </div>
            </div>
            <div className={style.rightMenu}>
                <img src={Truck} alt='Truck' />
            </div>
        </MiddleBox>
    )
};

export default memo(Login);