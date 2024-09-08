import React from 'react'
import styles from './Option.module.scss';
import Checkbox from '../Checkbox/Checkbox';

const Option = ({ optionText, isSelected, onOptionChange, key , type }) => {
    // console.log("issel", isSelected)
    return (
        <div className={`${isSelected ? styles.optionContainerActive : styles.optionContainer}`} onClick={onOptionChange} key={key}>
            <Checkbox isSelected={isSelected} id={`checkbox-${key}`} />
            <p className={styles.optionText}>{optionText}</p>
        </div>
    )
}

export default Option