import { TrackingZipcode } from '@/domain/models/get-tracking-zipcodes';
import { ZipcodeProps } from '@/domain/models/get-zipcodes';
import { GetTrackingZipcode } from '@/domain/usecases/get-tracking-zipcode';
import { useEffect, useState } from 'react';
import style from './index.module.css';

type Props = {
    data: ZipcodeProps[];
    getTrackingZipcode: GetTrackingZipcode;
};

const Tracking: React.FC<Props> = ({ data, getTrackingZipcode }) => {
    const [openExtraOptions, setOpenExtraOptions] = useState({});
    const [routes, setRoutes] = useState<TrackingZipcode>();

    const openCloseOptions = (code: string) => {
        setOpenExtraOptions(el => ({ ...el, [`${code}`]: !openExtraOptions[code] }));
    }

    useEffect(() => {
        const fetchData = async () => {

            const response = await getTrackingZipcode.execute(data[0].code);

            setRoutes(response);
        }

        fetchData();
    }, [])

    return (
        <div className={style.containerTracking}>
            {data?.length === 0 && (
                <label data-testid="labelNoContent">Você não possui rastreamentos</label>
            )}
            {data?.length > 0 && data.map(el => (
                <div className={style.boxTracking} key={el.code}>
                    <div className={style.row}>
                        <label className={style.title} data-testid="name">{el.name}</label>
                    </div>
                    <div className={style.extraOptions} key={el.code}>
                        {routes && routes.routes.map(route => (
                            <label key={route.description}>
                                <label className={style.time} data-testid="dateExtraOptions">{route.date}</label>
                                <label data-testid="routeExtraOptions">{route.start ? (`${route.start} para ${route.end}`)
                                    : (`${route.description}`)}
                                </label>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tracking;