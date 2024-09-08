import React, { useEffect } from 'react'
import styles from './Home.module.scss';
import BusinessLogo from '/business-logo-home.png'
import Button from '../../components/Button/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../../store/reducers/questionSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchllQuestions = async () => {
        try {
            const resp = await axios.get(`https://quiz-app-be-7xrs.onrender.com/api/questions`);
            console.log("resp->", resp?.data)
            if (resp?.data?.status === "success") {
                dispatch(setQuestions(resp?.data?.data));
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        fetchllQuestions();
    }, [])

    return (
        <div className={styles.homeContainer}>
            <div className={styles.businessLogo}>
                <img src={BusinessLogo} draggable={false} />
            </div>

            <div className={styles.quizButton}>
                <div>
                    <p>Quiz</p>
                </div>
            </div>

            <div className={styles.button}>
                <Button text={'Start'} buttonConfig={{ 'width': '50%' }} onClick={() => navigate(`/question/1`)} />
            </div>
        </div>
    )
}

export default Home