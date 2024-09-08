import { useState, useEffect } from 'react'
import styles from './Question.module.scss'
import CircularProgressBar from '../../components/CircularBar/CircularBar';
import Option from '../../components/Option/Option';
import Button from '../../components/Button/Button';
import Arrow from '/arrow.svg'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setResult, updateAnswer, setQuestionTime, setQuizTime, resetState } from '../../store/reducers/questionSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import withSequentialNavigation from '../../components/withSequentialNavigation';
import { Tooltip } from 'react-tooltip';

const Question = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const questionId = parseInt(id, 10);
  const questions = useSelector((state) => state.questions.questions);
  const answers = useSelector((state) => state.questions.answers);
  const questionTime = useSelector((state) => state.questions.questionTime)

  const transformedAnswers = Object.keys(answers).reduce((acc, questionId) => {
    const answersList = answers[questionId];
    const question = questions.find(q => q.id === questionId);

    if (question) {
      // Get indices for each answer
      const indices = answersList.map(answer => {
        return question.options.indexOf(answer);
      }).filter(index => index !== -1); // Filter invalid indices

      if (indices.length > 0) {
        acc[questionId] = indices;
      }
    }

    return acc;
  }, {});

  const [selectedOptions, setSelectedOptions] = useState(transformedAnswers || {});
  const question = questions[id - 1];
  const isMultipleChoice = question.type === 'multiple-choice';


  /* ---------------states end here -----------------*/

  useEffect(() => {
    dispatch(setQuestionTime(Date.now()))
  }, [questionId]);


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
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/result`;
      const resp = await axios.post(url, answers);
      if (resp?.data?.status === 200) {
        console.log("Result submitted successfully", resp.data.data);
        dispatch(setResult(resp.data.data))
        navigate('/report');
      }
    } catch (e) {
      console.error("Error submitting result:", e);
    }
  };

  const handleNextClick = () => {
    const nextQuestionId = questionId + 1;

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

  const handleButtonClick = async (id) => {
    try {
      const selectedAnswerIndices = selectedOptions[id] || [];
      const selectedAnswers = selectedAnswerIndices.map(index => question.options[index]);
      const endTime = Date.now();
      const timeTaken = endTime - questionTime;

      if (questionId === questions.length) {
        dispatch(updateAnswer({
          questionId,
          answer: selectedOptions[questionId]?.map(index => question.options[index]) || [],
        }));
        await handleSubmit();

      } else {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/submit-answer`;
        const data = {
          "id": id.toString(),
          "answer": selectedAnswers,
          "timeTaken": timeTaken
        };
        const res = await axios.post(url, data);
        if (res?.data?.status == 200) {
          console.log("submit-answer->", res);
          handleNextClick(id);
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const endQuiz = () => {
    dispatch(resetState());
    navigate('/')
  }

  const handleGoBack = () => {
    if (questionId === 1) {
      navigate('/');
      dispatch(resetState());
    } else {
      const prevQuestionId = questionId - 1;
      navigate(`/question/${prevQuestionId}`);
    }
  };

  const isButtonDisabled = isMultipleChoice
    ? (selectedOptions[questionId]?.length || 0) === 0
    : (selectedOptions[questionId]?.length || 0) !== 1;


  return (
    <>
      <div className={styles.questionParent}>
        <div className={styles.crossBtn} id='back' onClick={handleGoBack}>
          <img src='/chevron-back.svg' width={"16px"} height={"16px"} />
          <Tooltip
            anchorSelect="#back"
            content="Go Back"
          />
        </div>
        <div className={styles.questionContainer}>
          <div>
            <img src='/decoration-top.svg' />
          </div>
          <div className={styles.questionsList}>
            <CircularProgressBar activeQuestion={id} totalQuestions={questions?.length} percentage={(id / questions?.length) * 100} />
            <div className={styles.questionBody}>
              <p className={styles.question}>{question?.question}</p>
              {question?.image && <img src={question.image} className={styles.questionImage} />}
              <div className={styles.allOptions} style={question?.image ? { height: "27vh" } : {}}>
                {question?.options?.map((optionText, index) => (
                  <Option
                    key={index}
                    optionText={optionText}
                    isSelected={selectedOptions[questionId]?.includes(index)}
                    onOptionChange={() => handleOptionChange(index)}
                    optionIndex={index}
                    type={question.type}
                  />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
                <Button
                  disabled={isButtonDisabled}
                  text={questionId === questions.length ? "Submit" : "Next"}
                  icon={Arrow}
                  buttonConfig={{ 'width': '80%', position: "absolute", bottom: "2.5%" }}
                  onClick={() => handleButtonClick(questionId)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.crossBtn} onClick={endQuiz} id='endQuiz'>
          <img src='/cross.svg' width={"16px"} height={"16px"} />
          <Tooltip
            anchorSelect="#endQuiz"
            content="Ending this quiz now will redirect you to Home screen !"
          />
        </div>
      </div>
    </>
  )
}

export default withSequentialNavigation(Question);
