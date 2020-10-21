import React from "react";
import styles from "./Loader.scss";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Loader({ className, progress }) {
  const progressValueRef = React.useRef();
  const loaderSvg =
    progress !== undefined ? (
      <svg
        class={styles.progress}
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        <circle
          class={styles.progressMeter}
          cx="60"
          cy="60"
          r="54"
          stroke-width="12"
        />
        <circle
          ref={progressValueRef}
          class={styles.progressValue}
          cx="60"
          cy="60"
          r="54"
          stroke-width="12"
        />
      </svg>
    ) : (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
      >
        <path
          fill="#fff"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    );

  React.useEffect(() => {
    if (!progressValueRef.current) return;
    const dashoffset = CIRCUMFERENCE * (1 - progress);
    progressValueRef.current.style.strokeDasharray = CIRCUMFERENCE;
    progressValueRef.current.style.strokeDashoffset = dashoffset;
  }, [progress, progressValueRef.current]);

  return <div className={`${styles.loader} ${className}`}>{loaderSvg}</div>;
}
