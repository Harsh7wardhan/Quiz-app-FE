import { useState } from 'react'
import styles from './Question.module.scss'
import CircularProgressBar from '../../components/CircularBar/CircularBar';
import Option from '../../components/Option/Option';
import Button from '../../components/Button/Button';
import Arrow from '/arrow.svg'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateAnswer } from '../../store/reducers/questionSlice';
import { useNavigate } from 'react-router-dom';

const Question = () => {
  const questions = useSelector((state) => state.questions.questions);
  const answers = useSelector((state) => state.questions);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { id } = useParams();
  const questionId = parseInt(id, 10);

  console.log("questions", id, questionId)

  const answered = 1;
  const total = 4;
  const percentage = (answered / total) * 100;

  const question = questions[id - 1];
  console.log("current ques", answers)

  const [selectedOptions, setSelectedOptions] = useState({});

  const isMultipleChoice = question.type === 'multiple-choice';

  const handleOptionChange = (index) => {
    setSelectedOptions((prevSelected) => {
      const newSelection = { ...prevSelected };

      if (isMultipleChoice) {
        // Toggle selection for multiple-choice
        const selectedForCurrentQuestion = newSelection[questionId] || [];
        if (selectedForCurrentQuestion.includes(index)) {
          newSelection[questionId] = selectedForCurrentQuestion.filter(i => i !== index);
        } else {
          newSelection[questionId] = [...selectedForCurrentQuestion, index];
        }
      } else {
        // Single-choice
        newSelection[questionId] = [index];
      }
      return newSelection;
    });
  };

  const handleNextClick = () => {
    const nextQuestionId = questionId + 1; // Increment by 1

    // Save the user's answer to Redux
    dispatch(updateAnswer({
      questionId,
      answer: selectedOptions[questionId]?.map(index => question.options[index]) || [],
    }));

    if (nextQuestionId <= questions.length) {
      navigate(`/question/${nextQuestionId}`);
    } else {
      navigate('/report');
    }
  };

  const isButtonDisabled = isMultipleChoice
  ? (selectedOptions[questionId]?.length || 0) === 0
  : (selectedOptions[questionId]?.length || 0) !== 1;


  return (
    <div className={styles.questionContainer}>
      <div>
        <img src='/decoration-top.svg' />
      </div>
      <div className={styles.questionsList}>
        <CircularProgressBar activeQuestion={id} totalQuestions={questions?.length} percentage={(id / questions?.length) * 100} />
        <div className={styles.questionBody}>
          <p className={styles.question}>{question?.question}</p>
          <div className={styles.allOptions}>
            {question?.options?.map((optionText, index) => (
              <Option
                key={index}
                optionText={optionText}
                isSelected={selectedOptions[questionId]?.includes(index)}
                onOptionChange={() => handleOptionChange(index)}
                type={question.type}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
            <Button
              disabled={isButtonDisabled}
              text={"Next"}
              icon={Arrow}
              buttonConfig={{ 'width': '80%', position: "absolute", bottom: "3%" }}
              onClick={() => handleNextClick(id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question