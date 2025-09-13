import { NavLink } from "react-router-dom";
import styles from "./Country.module.css";

function Country({ country }) {
  return (
    <NavLink to={`${country.name.common}`} className={styles.countryLink}>
      <div className={styles.country}>
        <div className={styles.flag}>
          <img src={country.flags.svg} alt={country.flags.alt} loading="lazy" />
        </div>

        <div className={styles.countryNameInfo}>
          <h3 className={styles.countryName}>{country.name.common}</h3>
          <div className={styles.info}>
            <p>
              Population: <span>{country.population.toLocaleString()}</span>
            </p>
            <p>
              Region: <span>{country.region}</span>
            </p>
            <p>
              Capital:{" "}
              <span>
                {country.capital?.join(" | ") === ""
                  ? "-"
                  : country.capital?.join(" | ")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default Country;
