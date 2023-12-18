import ArrowDown from '@/presentation/assets/images/ArrowDown.png';
import { useState } from 'react';
import style from './index.module.css';

const Tracking: React.FC = () => {
    const [openExtraOptions, setOpenExtraOptions] = useState(false);

    return (
        <div className={style.containerTracking}>
            <div className={style.boxTracking}>
                <div className={style.row}>
                    <label className={style.title}>Fone de ouvido</label>
                    <button className={style.options} onClick={() => setOpenExtraOptions(el => !el)}>
                        <img src={ArrowDown} className={openExtraOptions ? style.rotateImg : ''} alt='seta' />
                        <label className={style.lastInfo}><label className={style.time}>12/10 - 10:30</label>Saiu para entrega </label>
                    </button>
                </div>
                {openExtraOptions && (
                    <div className={style.extraOptions}>
                        <label><label className={style.time}>12/10 - 10:30</label>Hello Extra Options</label>
                        <label><label className={style.time}>12/10 - 10:30</label>Hello Extra Options</label>
                        <label><label className={style.time}>12/10 - 10:30</label>Hello Extra Options</label>
                        <label><label className={style.time}>12/10 - 10:30</label>Hello Extra Options</label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tracking;