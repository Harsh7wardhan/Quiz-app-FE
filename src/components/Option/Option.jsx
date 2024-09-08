import React from 'react'
import styles from './Option.module.scss';
import Checkbox from '../Checkbox/Checkbox';

const Option = ({ optionText, isSelected, onOptionChange, optionIndex , type }) => {
    return (
        <div className={`${isSelected ? styles.optionContainerActive : styles.optionContainer}`} onClick={onOptionChange}>
            <Checkbox isSelected={isSelected} id={`checkbox-${optionIndex}`} />
            <p className={styles.optionText}>{optionText}</p>
        </div>
    )
}

export default Option