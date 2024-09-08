import React, { useEffect, useState } from "react";
import styles from "./ProgressMeter.module.scss"; // Importing the styles
import './check.css';
import Button from "../Button/Button";

const CircularProgressMeter = ({ percentage }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer;
        if (progress < percentage) {
            timer = setTimeout(() => setProgress(progress + 1), 20);
        }
        return () => clearTimeout(timer);
    }, [progress, percentage]);


    return (
        <>
            <img src="/gradient-semi-circle.png" className={styles.gradient}/>
            <div className={styles.progressMeterContainer}>
                <svg className={styles.progressMeterCircle} width="220" height="220" viewBox="0 0 120 120">
                    <circle
                        className={styles.circleMeterBackground}
                        cx="60"
                        cy="60"
                        r="47.5"
                        strokeWidth="20"
                    />
                    <circle
                        className={styles.circleMeterProgress}
                        cx="60"
                        cy="60"
                        r="47.5"
                        strokeWidth="20"
                        strokeDasharray="298.451"
                        strokeDashoffset={(298.451 * (100 - 65)) / 100}
                    />
                    <polygon
                        className={styles.meterTriangle}
                        points="60,15 55,25 65,25"
                        fill="black"
                        transform={`rotate(${((progress / 100) * 360) + 55}, 60, 60)`}
                    />
                </svg>
                <div className={styles.innerCircle}>
                    <span className={styles.countText}>{Math.ceil(percentage)}%</span>
                </div>
            </div>

        </>
    );
};

export default CircularProgressMeter;
