import styles from "./Button.module.css";

const styleSize = {
  square: {
    fontSize: "1.4rem",
    padding: "1.3rem 2.4rem",
  },
  small: {
    fontSize: "1.4rem",
    padding: "0.6rem 2.4rem",
  },
  medium: {
    fontSize: "1.6rem",
    padding: "0.8rem 3.2rem",
  },
};

function Button({ children, onClick, btnSize = "small", className = "" }) {
  const btnStyle = styleSize[btnSize];

  return (
    <button
      onClick={onClick}
      style={btnStyle}
      className={`${styles.btn} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
