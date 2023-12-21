import { ZipcodeProps } from '@/domain/models/get-zipcodes';
import ArrowDown from '@/presentation/assets/images/ArrowDown.png';
import { useState } from 'react';
import style from './index.module.css';

type Props = {
    data: ZipcodeProps[]
};

const Tracking: React.FC<Props> = ({ data }) => {
    const [openExtraOptions, setOpenExtraOptions] = useState(false);

    return (
        <div className={style.containerTracking}>
            <div className={style.boxTracking}>
                {data?.map(el =>
                    <div className={style.row}>
                        <label className={style.title}>{el.code}</label>
                        <button className={style.options} onClick={() => setOpenExtraOptions(el => !el)}>
                            <img src={ArrowDown} className={openExtraOptions ? style.rotateImg : ''} alt='seta' />
                            <label className={style.lastInfo}>
                                <label className={style.time}>{el.routes[0].date}</label>
                                {el.routes[0].start} para {el.routes[0].end}
                            </label>
                        </button>
                    </div>
                )}
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