import { ZipcodeProps } from '@/domain/models/get-zipcodes';
import ArrowDown from '@/presentation/assets/images/ArrowDown.png';
import moment from 'moment';
import { useState } from 'react';
import style from './index.module.css';

type Props = {
    data: ZipcodeProps[]
};

const Tracking: React.FC<Props> = ({ data }) => {
    const [openExtraOptions, setOpenExtraOptions] = useState({});

    const openCloseOptions = (code: string) => {
        setOpenExtraOptions(el => ({ ...el, [`${code}`]: !openExtraOptions[code] }));
    }

    return (
        <div className={style.containerTracking}>
            {data?.length === 0 && (
                <label data-testid="labelNoContent">Você não possui rastreamentos</label>
            )}
            {data?.length > 0 && data.map(el => (
                <div className={style.boxTracking} key={el.code}>
                    <div className={style.row}>
                        <label className={style.title} data-testid="name">{el.name}</label>
                        <button className={style.options} onClick={() => openCloseOptions(el.code)} data-testid="onPressExtraOptions">
                            <img src={ArrowDown} className={openExtraOptions[el.code] ? style.rotateImg : ''} alt='seta' />
                            <label className={style.lastInfo}>
                                <label className={style.time} data-testid="date">{moment.utc(el.routes[0].date).format('DD/MM HH:mm')}</label>
                                <label data-testid="route">{el.routes[0].start ? (`${el.routes[0].start} para ${el.routes[0].end}`)
                                    : (`${el.routes[0].description}`)}</label>
                            </label>
                        </button>
                    </div>
                    {openExtraOptions[el.code] && (
                        <div className={style.extraOptions} key={el.code}>
                            {el.routes.map(route => (
                                <label key={route.description}>
                                    <label className={style.time} data-testid="dateExtraOptions">{moment.utc(route.date).format('DD/MM HH:mm')}</label>
                                    <label data-testid="routeExtraOptions">{route.start ? (`${route.start} para ${route.end}`)
                                        : (`${route.description}`)}
                                    </label>
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