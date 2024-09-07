import { useState } from 'react'
import styles from './Question.module.scss'
import CircularProgressBar from '../../components/CircularBar/CircularBar';
import Option from '../../components/Option/Option';
import Button from '../../components/Button/Button';
import Arrow from '/arrow.svg'

const Question = () => {
  const answered = 1;
  const total = 4;
  const percentage = (answered / total) * 100;
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  const options = [
    "Data Analysis",
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "Deep Learning",
    "Deep Learning",
    "Deep Learning",
    "Deep Learning",
  ];

  const handleOptionChange = (index) => {
    setSelectedOptionIndex(index);
  };

  console.log("selectedOptionIndex", selectedOptionIndex)

  return (
    <div className={styles.questionContainer}>
      <div>
        <img src='/decoration-top.svg' />
      </div>
      <div className={styles.questionsList}>
        <CircularProgressBar activeQuestion={3} totalQuestions={4} percentage={75} />

        <div className={styles.questionBody}>
          <p className={styles.question}>How do you judge what should be added in the next version of the app?</p>
          <div className={styles.allOptions}>
            {options?.map((optionText, index) => (
              <Option
                key={index}
                optionText={optionText}
                isSelected={selectedOptionIndex === index}
                onOptionChange={() => handleOptionChange(index)}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
            <Button text={"Next"} icon={Arrow} buttonConfig={{ 'width': '80%', position: "absolute", bottom: "3%" }} />
          </div>

        </div>

      </div>
    </div>
  )
}

export default Question