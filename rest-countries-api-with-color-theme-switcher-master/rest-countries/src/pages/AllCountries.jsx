import Countries from "../components/Countries.jsx";
import styles from "./AllCountries.module.css";
import Select from "../components/Select.jsx";
import { useSearchParams } from "react-router";
import Search from "../components/Search.jsx";
import SortBy from "../components/SortBy.jsx";
import { useEffect } from "react";

const filterOptions = [
  { value: `Africa`, text: `Africa` },
  { value: `Americas`, text: `America` },
  { value: `Asia`, text: `Asia` },
  { value: `Europe`, text: `Europe` },
  { value: `Oceania`, text: `Oceania` },
];

function AllCountries({
  query,
  setQuery,
  filter: globalFilter,
  setFilter: setGlobalFilter,
  sortingBy,
  setSortingBy,
  countries,
  isLoading,
}) {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  let countriesToDisplay = countries;
  if (query) {
    const queryToLower = query.toLowerCase();
    countriesToDisplay = countries.filter((country) => {
      const names = country.name.common.toLowerCase();
      if (names.startsWith(queryToLower)) return country;
    });
    if (countriesToDisplay.length < 1)
      countriesToDisplay = countries.filter((country) => {
        const names = country.name.common.toLowerCase();
        if (names.includes(queryToLower)) return country;
      });
  }

  const filter = globalFilter || searchParams.get(`region`);
  if (filterOptions.some((obj) => obj.value === filter)) {
    countriesToDisplay = countriesToDisplay.filter(
      (country) => country.region === filter
    );
  }

  function sortCountries({ field, order }) {
    let sortedCountries;
    if (field === `population`) {
      sortedCountries = countriesToDisplay.sort(
        (a, b) => (a[field] - b[field]) * (order === true ? -1 : 1)
      );
    }
    if (field === `name`) {
      sortedCountries = countriesToDisplay.sort(
        (a, b) =>
          a.name.common.localeCompare(b.name.common) * (order === true ? -1 : 1)
      );
    }
    countriesToDisplay = sortedCountries;
  }

  if (sortingBy) {
    sortCountries(sortingBy);
  }

  useEffect(function () {}, [sortingBy]);

  return (
    <div className={styles.countriesCont}>
      <div className={styles.inputsExtended}>
        <div className={styles.inputs}>
          <Search query={query} onChange={setQuery}></Search>
          <Select options={filterOptions} setGlobalValue={setGlobalFilter}>
            Filter by Region
          </Select>
        </div>
        <SortBy
          sortingBy={sortingBy}
          sortCountries={sortCountries}
          setSortingBy={setSortingBy}
        ></SortBy>
      </div>

      <Countries
        isLoading={isLoading}
        countries={countriesToDisplay}
      ></Countries>
    </div>
  );
}

export default AllCountries;
