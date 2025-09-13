import styles from "./Countries.module.css";
import Country from "./Country";
import CountrySkeleton from "./LoadingSkeleton";

function Countries({ countries, isLoading }) {
  const arr = new Array(20).fill(0);

  return (
    <div className={styles.container}>
      {isLoading
        ? arr.map((_, i) => (
            <CountrySkeleton aspectRatio="28/32" key={i}></CountrySkeleton>
          ))
        : countries.map((country) => (
            <Country country={country} key={country.name.official} />
          ))}
    </div>
  );
}

export default Countries;
