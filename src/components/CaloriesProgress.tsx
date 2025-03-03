import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  currentCalories: number;
  dailyGoal: number;
}

const CaloriesProgress: React.FC<Props> = ({ currentCalories, dailyGoal }) => {
  const percentage = Math.min((currentCalories / dailyGoal) * 100, 100);

  return (
    <div style={{ width: 200, height: 200, margin: '0 auto' }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(currentCalories)}\nkcal`}
        styles={buildStyles({
          pathColor: "#4CAF50",
          textColor: "#ffffff",
          trailColor: "#333",
          backgroundColor: "#000",
          textSize: '16px',
          pathTransitionDuration: 0.5,
        })}
      />
    </div>
  );
};

export default CaloriesProgress;
