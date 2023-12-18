import Tracking from "@/presentation/components/tracking";
import React from "react";
import style from './index.module.css';

const Home: React.FC = () => {
    return (
        <>
            <div className={style.containerHome}>
                <div className={style.boxHome}>
                    <div className={style.left}>
                        <Tracking />
                    </div>
                    <div className={style.right}>
                        Hello right
                    </div>
                </div>
            </div>
        </>

    )
};

export default Home;