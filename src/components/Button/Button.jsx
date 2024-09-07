import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => {
    return (
        <div className={styles.buttonContainer} style={{ ...props?.buttonConfig }}>
            <p>{props?.text}</p>
            {props?.icon && <img src={props.icon} />}
        </div >
    )
}

export default Button