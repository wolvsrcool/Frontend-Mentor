import { useState } from "react";
import styles from "./Search.module.css";

function Search({ query, onChange }) {
  const [queryLocal, setQuery] = useState(query ?? "");

  function handleChange(e) {
    setQuery(e.target.value);
    onChange(e.target.value);
  }

  return (
    <div className={styles.searchbar}>
      <div className={styles.icon}>
        <ion-icon name="search-sharp"></ion-icon>
      </div>
      <input
        type="text"
        placeholder="Search for a country..."
        name="search"
        value={queryLocal}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
