import React from 'react'
import containerStyles from '../Question/Question.module.scss';
import styles from './Report.module.scss';
import Button from '../../components/Button/Button';
import ProgressMeter from '../../components/ProgressMeter/ProgressMeter';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../store/reducers/questionSlice';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resultData = useSelector((state) => state.questions.result);

  const restartQuiz = () => {
    dispatch(resetState());
    navigate(`/`);
  }

  return (
    <div className={styles.reportParent}>
      <div>
        <img src='/decoration-top.svg' width={"430px"}/>
      </div>
      <div className={styles.reportContainer}>
        <p className={styles.resultText}>Your Result</p>

        <ProgressMeter percentage={resultData?.scorePercentage} />
        <div className={styles.correctResult}>
          <span className={styles.correctCircle}></span>
          <span className={styles.correctNumber}>{resultData?.correctCount}</span><span className={styles.correctText}>Correct</span>
        </div>
        <div className={styles.incorrectResult}>
          <span className={styles.correctCircle}></span>
          <span className={styles.correctNumber}>{resultData?.incorrectCount}</span><span className={styles.correctText}>Incorrect</span>
        </div>

        <Button text={'Start Again'} buttonConfig={{ 'marginTop': '3rem' }} onClick={restartQuiz} />

      </div>
    </div>
  )
}

export default Report