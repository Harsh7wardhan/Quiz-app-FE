import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const withSequentialNavigation = (WrappedComponent) => {
  const HOC = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const questions = useSelector((state) => state.questions.questions);
    const answers = useSelector((state) => state.questions.answers);

    // Extract question id from the URL
    const questionId = parseInt(id, 10);

    React.useEffect(() => {
      if (questions.length === 0) {
        // No questions loaded, redirect to home or an appropriate page
        navigate('/');
        return;
      }
      
      // Check if the questionId is within bounds
      if (questionId < 1 || questionId > questions.length) {
        // If out of bounds, stay on the current valid route
        const highestAccessibleQuestionId = Object.keys(answers).length + 1;
        navigate(`/question/${Math.min(highestAccessibleQuestionId, questions.length)}`);
        return;
      }

      // Ensure sequential access: redirect to the highest accessible question if the user tries to access a future question
      const highestAccessibleQuestionId = Object.keys(answers).length + 1;
      if (questionId > highestAccessibleQuestionId) {
        navigate(`/question/1`);
      }
    }, [questionId, answers, questions, navigate]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withSequentialNavigation;
