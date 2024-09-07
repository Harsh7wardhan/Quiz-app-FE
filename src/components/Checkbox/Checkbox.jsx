import React from 'react'
import styles from './Checkbox.module.scss';

const Checkbox = ({ isSelected , id }) => {
    return (
        <div className={styles.container}>
            <div className={styles.round}>
                <input
                    type="checkbox"
                    id={id} 
                    checked={isSelected}
                    readOnly
                />
                <label htmlFor="checkbox"></label>
            </div>
        </div>
    )
}

export default Checkbox