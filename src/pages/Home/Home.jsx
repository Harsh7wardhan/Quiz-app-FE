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
            const resp = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/questions`);
            if (resp?.data?.status === "success") {
                dispatch(setQuestions(resp?.data?.data));
                navigate(`/question/1`)
            }
        } catch (e) {
            console.error(e)
        }
    }
   
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
                <Button text={'Start'} buttonConfig={{ 'width': '50%' }} onClick={fetchllQuestions} />
            </div>
        </div>
    )
}

export default Home