import React from 'react'
import styles from './Home.module.scss';
import BusinessLogo from '/business-logo-home.png'
import Button from '../../components/Button/Button';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.businessLogo}>
                <img src={BusinessLogo} draggable={false}/>
            </div>

            <div className={styles.quizButton}>
                <div>
                    <p>Quiz</p>
                </div>
            </div>

            <div className={styles.button}>
                <Button text={'Start'} buttonConfig={{'width' : '50%'}}/>
            </div>
        </div>
    )
}

export default Home