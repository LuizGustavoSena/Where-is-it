import React from "react";
import style from './index.module.css';

const Home: React.FC = () => {
    return (
        <>
            <div className={style.containerHome}>
                <div className={style.boxHome}>
                    Hello World
                </div>
            </div>
        </>

    )
};

export default Home;