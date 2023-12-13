import Truck from '@/presentation/assets/gifs/truck.gif';
import style from './index.module.css';

type Props = {
    message?: string;
}

const Loading: React.FC<Props> = (props) => {
    return (
        <div className={style.boxLoading}>
            <img src={Truck} />
            <label>{props?.message || 'Carregando...'}</label>
        </div>
    )
};

export default Loading;