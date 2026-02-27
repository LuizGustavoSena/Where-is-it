import Eye from '@/presentation/assets/images/eye.png';
import HiddenEye from '@/presentation/assets/images/hiddenEye.png';
import React from "react";
import styles from "./index.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    iconSrc?: string;
    iconAlt?: string;
    error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ iconSrc, iconAlt = "icon", className, error, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);

        const isPasswordType = type === "password";

        const computedType = isPasswordType ? (showPassword ? "text" : "password") : type;

        return (
            <div className={styles.wrapper}>
                <div className={`${styles.container} ${error ? styles.containerError : ""}`}>
                    {iconSrc && (
                        <img
                            src={iconSrc}
                            alt={iconAlt}
                            className={styles.leftIcon}
                        />
                    )}

                    <input
                        ref={ref}
                        className={`${styles.input} ${iconSrc ? styles.withLeftIcon : ""} ${className ?? ""} ${isPasswordType ? styles.withRightIcon : ""}`}
                        type={computedType}
                        {...props}
                    />

                    {isPasswordType && (
                        <button
                            type="button"
                            className={styles.rightButton}
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                            <img
                                src={showPassword ? Eye : HiddenEye}
                                alt=""
                                className={styles.rightIcon}
                            />
                        </button>
                    )}
                </div>

                {error && <span className={styles.errorText}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";