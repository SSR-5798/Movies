import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./CircularRating.css";

const CircularRating = ({ rating, className, details }) => {
  return (
    <div className={!details ? "circleRating" : "rating"}>
      <CircularProgressbar
        value={rating}
        className={className}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor:
            (rating >= 7 && "green") ||
            (rating >= 5 && rating < 7 && "orange") ||
            (rating < 5 && "red"),
        })}
      />
    </div>
  );
};

export default CircularRating;
