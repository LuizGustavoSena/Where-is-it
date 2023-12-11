import Truck from '@/presentation/assets/images/TruckMobile.png';
import React, { memo } from "react";
import style from './index.module.css';

const Login: React.FC = () => {
    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.leftMenu}>
                    <label>Bem vindo de volta</label>

                    <div className={style.inputs}>
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Senha" />

                    </div>

                    <div className={style.createAccount}>
                        <a>Criar conta</a>
                    </div>

                    <button>
                        Entrar
                    </button>
                </div>
                <div className={style.rightMenu}>
                    <img src={Truck} alt='Truck' />
                </div>
            </div>
        </div>
    )
};

export default memo(Login);