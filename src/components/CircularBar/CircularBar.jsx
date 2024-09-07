import React, { useState, useEffect } from "react";
import styles from "./CircularBar.module.scss";

const CircularProgressBar = ({ activeQuestion, totalQuestions, percentage }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer;
        if (progress < percentage) {
            timer = setTimeout(() => setProgress(progress + 1), 20); 
        }
        return () => clearTimeout(timer);
    }, [progress, percentage]);

    return (
        <div className={styles.progressContainer}>
            <svg className={styles.progressCircle} width="120" height="120" viewBox="0 0 120 120">
                <circle
                    className={styles.circleBackground}
                    cx="60"
                    cy="60"
                    r="54"
                    strokeWidth="12"
                />
                <circle
                    className={styles.circleProgress}
                    cx="60"
                    cy="60"
                    r="54"
                    strokeWidth="12"
                    strokeDasharray="339.292"
                    strokeDashoffset={(339.292 * (100 - progress)) / 100}
                />
            </svg>
            <div className={styles.progressText}>
                <span className={styles.countText}>{activeQuestion}</span><span className={styles.questionText}>/{totalQuestions}</span>
            </div>
        </div>
    );
};

export default CircularProgressBar;
