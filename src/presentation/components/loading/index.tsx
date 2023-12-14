import Truck from '@/presentation/assets/gifs/truck.gif';
import style from './index.module.css';

type Props = {
    message?: string;
    show: boolean;
}

const Loading: React.FC<Props> = (props) => {
    return (
        <>
            {props.show && (
                <div className={style.blackBox}>
                    <div className={style.boxLoading}>
                        <img src={Truck} />
                        <label>{props?.message || 'Carregando...'}</label>
                    </div>
                </div>
            )}
        </>
    )
};

export default Loading;