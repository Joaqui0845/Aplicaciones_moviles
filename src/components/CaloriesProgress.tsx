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
    <div style={{ width: 120, height: 120 }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(currentCalories)} kcal`}
        styles={buildStyles({
          pathColor: "#ffffff",
          textColor: "#ffffff",
          trailColor: "#333",
          backgroundColor: "#000",
        })}
      />
    </div>
  );
};

export default CaloriesProgress;
