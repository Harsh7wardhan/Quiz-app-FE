import { useState } from 'react'
import styles from './Question.module.scss'
import CircularProgressBar from '../../components/CircularBar/CircularBar';
import Option from '../../components/Option/Option';
import Button from '../../components/Button/Button';
import Arrow from '/arrow.svg'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setResult, updateAnswer } from '../../store/reducers/questionSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Question = () => {
  const questions = useSelector((state) => state.questions.questions);
  const answers = useSelector((state) => state.questions.answers)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { id } = useParams();
  const questionId = parseInt(id, 10);

  console.log("questions", id, questionId)

  const answered = 1;
  const total = 4;
  const percentage = (answered / total) * 100;

  const question = questions[id - 1];

  const [selectedOptions, setSelectedOptions] = useState({});

  console.log("current ques", selectedOptions)

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

  const handleSubmit = async () => {
    try {
      const url = `https://quiz-app-be-7xrs.onrender.com/api/result`;
      const resp = await axios.post(url, answers);
      console.log("resply", resp);
      if (resp?.data?.status === 200) {
        console.log("Result submitted successfully", resp.data.data);
        dispatch(setResult(resp.data.data))
        navigate('/report'); // Navigate to the report page after submitting the result
      }
    } catch (e) {
      console.error("Error submitting result:", e);
    }
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

  const selectedAnswerIndices = selectedOptions[questionId] || [];
  const selectedAnswers = selectedAnswerIndices.map(index => question.options[index]); // Map indices to option texts
  console.log("asnwerss-->", selectedAnswerIndices, selectedAnswers)

  const handleButtonClick = async (id) => {
    try {
      const selectedAnswerIndices = selectedOptions[id] || [];
      const selectedAnswers = selectedAnswerIndices.map(index => question.options[index]); // Map indices to option texts
      console.log("asnwerss andar-->", selectedAnswerIndices, selectedAnswers)

      if (questionId === questions.length) {
        await handleSubmit(); // Call handleSubmit when it's the last question
      } else {
        const url = 'https://quiz-app-be-7xrs.onrender.com/api/submit-answer';
        const data = {
          "id": id.toString(),
          "answer": selectedAnswers,
        };
        const res = await axios.post(url, data);
        if (res?.data?.status == 200) {
          console.log("cjeck->", res);
          handleNextClick(id);
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

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
              text={questionId === questions.length ? "Submit" : "Next"}
              icon={Arrow}
              buttonConfig={{ 'width': '80%', position: "absolute", bottom: "3%" }}
              onClick={() => handleButtonClick(questionId)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question