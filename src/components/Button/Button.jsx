import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => {

    return (
        <div
            className={styles.buttonContainer}
            style={{
                ...props?.buttonConfig, opacity: props.disabled ? 0.5 : 1,
                pointerEvents: props.disabled ? 'none' : 'auto',
                cursor: props.disabled ? 'not-allowed' : 'pointer',
            }}
            onClick={props?.onClick}
        >
            <p>{props?.text}</p>
            {props?.icon && <img src={props.icon} />}
        </div >
    )
}

export default Button