import styles from "./LoadingSkeleton.module.css";

function Loader({ width = "100%", aspectRatio = "1/1" }) {
  const style = {
    width,
    aspectRatio,
  };

  return (
    <div className={styles.wrap} style={style}>
      <div className={styles.loader}></div>;
    </div>
  );
}

export default Loader;
