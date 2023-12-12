import style from './index.module.css';

interface Props {
    children: React.ReactNode;
}

const MiddleBox: React.FC<Props> = ({ children }) => {
    return (
        <div className={style.container}>
            <div className={style.box}>
                {children}
            </div>
        </div>
    )
}

export default MiddleBox;