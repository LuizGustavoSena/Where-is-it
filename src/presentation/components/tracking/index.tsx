import { ZipcodeProps } from '@/domain/models/get-zipcodes';
import ArrowDown from '@/presentation/assets/images/ArrowDown.png';
import moment from 'moment';
import { useState } from 'react';
import style from './index.module.css';

type Props = {
    data: ZipcodeProps[]
};

const Tracking: React.FC<Props> = ({ data }) => {
    const [openExtraOptions, setOpenExtraOptions] = useState(false);

    return (
        <div className={style.containerTracking}>
            {data?.length === 0 && (
                <label>Você não possui rastreamentos</label>
            )}
            {data?.length > 0 && data.map(el => (
                <div className={style.boxTracking} key={el.code}>
                    <div className={style.row}>
                        <label className={style.title}>{el.code}</label>
                        <button className={style.options} onClick={() => setOpenExtraOptions(el => !el)}>
                            <img src={ArrowDown} className={openExtraOptions ? style.rotateImg : ''} alt='seta' />
                            <label className={style.lastInfo}>
                                <label className={style.time}>{moment.utc(el.routes[0].date).format('DD/MM HH:mm')}</label>
                                {el.routes[0].start && (`${el.routes[0].start} para ${el.routes[0].end}`)}
                                {!el.routes[0].start && (`${el.routes[0].description}`)}
                            </label>
                        </button>
                    </div>
                    {openExtraOptions && (
                        <div className={style.extraOptions}>
                            {el.routes.map(route => (
                                <label>
                                    <label className={style.time}>{moment.utc(route.date).format('DD/MM HH:mm')}</label>
                                    {route.start && (`${route.start} para ${route.end}`)}
                                    {!route.start && (`${route.description}`)}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Tracking;