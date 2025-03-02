import React from "react";
import { ProgressBar } from "react-bootstrap";

interface Props {
  label: string;
  current: number;
  goal: number;
  color: string;
}

const NutrientProgress: React.FC<Props> = ({ label, current, goal, color }) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div style={{ marginBottom: "10px" }}>
      <strong style={{ color }}>{label}</strong>
      <ProgressBar now={percentage} label={`${Math.round(percentage)}%`} style={{ height: "10px" }} />
    </div>
  );
};

export default NutrientProgress;
