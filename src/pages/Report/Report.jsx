import React from 'react'
import containerStyles from '../Question/Question.module.scss';
import styles from './Report.module.scss';
import Button from '../../components/Button/Button';
import ProgressMeter from '../../components/ProgressMeter/ProgressMeter';

const Report = () => {
  return (
    <div className={containerStyles.questionContainer}>
      <div>
        <img src='/decoration-top.svg' />
      </div>
      <div className={styles.reportContainer}>
        <p className={styles.resultText}>Your Result</p>

        <ProgressMeter percentage={"65"} />
        <div className={styles.correctResult}>
          <span className={styles.correctCircle}></span>
          <span className={styles.correctNumber}>3</span><span className={styles.correctText}>Correct</span>
        </div>
        <div className={styles.incorrectResult}>
          <span className={styles.correctCircle}></span>
          <span className={styles.correctNumber}>3</span><span className={styles.correctText}>Incorrect</span>
        </div>

        <Button text={'Start Again'} buttonConfig={{ 'marginTop' : '3rem'}} />

      </div>
    </div>
  )
}

export default Report