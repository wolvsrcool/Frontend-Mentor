import { useState } from "react";
import styles from "./Select.module.css";
import { useSearchParams } from "react-router";

function Select({ setGlobalValue, options, children }) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const curParam = searchParams.get("region");

  function setParam(param) {
    if (curParam === param) {
      console.log(`delete`);
      searchParams.delete("region");
      setSearchParams(searchParams);
      setGlobalValue(undefined);
    } else {
      setSearchParams({ region: param });
      setGlobalValue(param);
    }
  }

  return (
    <div className={styles.select} onClick={() => setOpen((cur) => !cur)}>
      <div className={styles.placeholder}>
        <p>{children}</p>
        <div className={`${styles.icon} ${open ? `${styles.open}` : ""}`}>
          <ion-icon name="chevron-down-sharp"></ion-icon>
        </div>
      </div>
      {open ? (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${
                option.value === curParam ? `${styles.selected}` : ""
              }`}
              onClick={() => setParam(option.value)}
            >
              <p>{option.text} </p>
              {option.value === curParam ? (
                <ion-icon name="checkmark-outline"></ion-icon>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Select;
