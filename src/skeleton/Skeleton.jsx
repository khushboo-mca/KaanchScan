import "./Skeleton.css";
import skeleton from "../assets/skeleton.png";
import kaan1 from "../assets/kaan1.png";

function Skeleton({ count = 25 }) {
  return (
    <div className="collision-skeleton">
      {Array.from({ length: count }).map((_, i) => (
        <span
          className="logo-float"
          key={i}
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
        >
          <img src={skeleton} alt="loading" />
          <img src={kaan1} alt="kaan logo" />
        </span>
      ))}
    </div>
  );
}

export default Skeleton;
