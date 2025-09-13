import styles from "./CountryFullSkeleton.module.css";
import Skeleton from "./LoadingSkeleton";
import { useMemo } from "react";

function CountryFullSkeleton() {
  const widthsArr1 = useMemo(
    () => [28, 24, 20, 24, 20].map((width) => width + Math.random() * 4 - 8),
    []
  );
  const widthsArr2 = useMemo(
    () => [24, 20, 28].map((width) => width + Math.random() * 4 - 8),
    []
  );
  const widthsArr3 = useMemo(
    () => [10, 10, 10, 10, 10].map((width) => width + Math.random() * 4),
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.flag}>
        <Skeleton width="60rem" aspectRatio="60/40"></Skeleton>
      </div>
      <div className={styles.infoName}>
        <Skeleton width="26rem" aspectRatio="26/3.8"></Skeleton>
        <div className={styles.infoMain}>
          <div className={styles.infoLeft}>
            {widthsArr1.map((w, i) => (
              <Skeleton
                width={`${w}rem`}
                aspectRatio={`${w}/2.4`}
                key={i}
              ></Skeleton>
            ))}
          </div>
          <div className={styles.infoRight}>
            {widthsArr2.map((w, i) => (
              <Skeleton
                width={`${w}rem`}
                aspectRatio={`${w}/2.4`}
                key={i}
              ></Skeleton>
            ))}
          </div>
        </div>
        <div className={styles.borders}>
          <Skeleton width="14rem" aspectRatio="14/2.4"></Skeleton>
          <div>
            {widthsArr3.map((w, i) => (
              <Skeleton
                width={`${w}rem`}
                aspectRatio={`${w}/3`}
                key={i}
              ></Skeleton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryFullSkeleton;
