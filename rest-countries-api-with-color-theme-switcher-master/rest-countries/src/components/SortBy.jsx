import Button from "./Button";
import styles from "./SortBy.module.css";

function SortBy({ setSortingBy, sortingBy }) {
  function handleSort(field) {
    if (sortingBy.field === field)
      setSortingBy((cur) => {
        return { ...cur, order: !cur.order };
      });
    else {
      if (field === `name`) setSortingBy({ field: field, order: false });
      else {
        setSortingBy({ field: field, order: true });
      }
    }
  }

  return (
    <div className={styles.container}>
      <p></p>
      <div className={styles.btnCont}>
        <div
          className={`${styles.btn} ${
            sortingBy.field === `population` ? styles.active : ""
          }`}
        >
          <Button
            onClick={() => {
              handleSort(`population`);
            }}
            btnSize="square"
          >
            <ion-icon name="people-outline"></ion-icon>
            <div
              className={`${styles.icon} ${
                sortingBy.field === `population` && sortingBy.order === false
                  ? styles.rotate
                  : ""
              }`}
            >
              <ion-icon name="arrow-down-outline"></ion-icon>
            </div>
          </Button>
        </div>
        <div
          className={`${styles.btn} ${
            sortingBy.field === `name` ? styles.active : ""
          }`}
        >
          <Button
            onClick={() => {
              handleSort(`name`);
            }}
            btnSize="square"
          >
            {sortingBy.field === `name` && sortingBy.order === true
              ? `Z-A`
              : `A-Z`}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SortBy;
