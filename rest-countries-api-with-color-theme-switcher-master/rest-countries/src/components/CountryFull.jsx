import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router";
import styles from "./CountryFull.module.css";
import Button from "./Button";
import CountryFullSkeleton from "./CountryFullSkeleton";

function CountryFull() {
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState(undefined);

  const { countryName } = useParams();

  const neighbours = useRef([]);

  useEffect(
    function () {
      async function getCountries() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(
              countryName
            )}?fullText=true`
          );
          if (res.status === 404) return;

          const data = await res.json();

          setCountry(...data);

          const borders = data[0].borders;
          const urls = [];
          borders?.forEach((border) => {
            urls.push(
              `https://restcountries.com/v3.1/alpha/${border}?fields=name`
            );
          });

          if (neighbours.current) neighbours.current = [];

          await Promise.allSettled(
            urls.map((url) =>
              fetch(url)
                .then((res) => res.json())
                .then((data) => {
                  if (!neighbours.current.includes(data.name.common))
                    neighbours.current.push(data.name.common);
                })
            )
          );
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getCountries();
    },
    [countryName]
  );

  if (isLoading) return <CountryFullSkeleton></CountryFullSkeleton>;
  if (!country) return <h2>Page not found!</h2>;

  const getUniqueValuesFromObject = (obj, field) => {
    let result;
    if (field) result = Object.entries(obj).map((arr) => arr[1][field]);
    else result = Object.entries(obj).map((arr) => arr[1]);

    return [...new Set(result)];
  };

  const nativeNames = country.name.nativeName
    ? getUniqueValuesFromObject(country.name.nativeName, "common")
    : ["-"];
  const currencies = country.currencies
    ? getUniqueValuesFromObject(country.currencies, "name")
    : ["-"];
  const languages = country.languages
    ? getUniqueValuesFromObject(country.languages)
    : ["-"];

  return (
    <div className={styles.country}>
      <div className={styles.flag}>
        <img src={country.flags.svg} alt={country.flags.alt} />
      </div>

      <div className={styles.info}>
        <h3>{country.name.common}</h3>
        <div className={styles.infoMain}>
          <div>
            <p>
              Native Names:&nbsp;
              <span>{nativeNames.join(", ")}</span>
            </p>
            <p>
              Population:&nbsp;
              <span>{country.population.toLocaleString()}</span>
            </p>
            <p>
              Region:&nbsp;<span>{country.region}</span>
            </p>
            <p>
              Sub Region:&nbsp;<span>{country.subregion ?? "-"}</span>
            </p>
            <p>
              Capital:&nbsp; <span>{country.capital?.join(", ") ?? "-"}</span>
            </p>
          </div>
          <div>
            <p>
              Top Level Domain:&nbsp; <span>{country.tld}</span>
            </p>
            <p>
              Currencies:&nbsp; <span>{currencies.join(", ")}</span>
            </p>
            <p>
              Languages:&nbsp; <span>{languages.join(", ")}</span>
            </p>
          </div>
        </div>

        {neighbours.current.length > 0 && (
          <div className={styles.borderLinks}>
            <p>
              <span>Border Countries</span>
            </p>

            <ul>
              {neighbours.current.map((border) => (
                <NavLink to={`/${border}`} key={border}>
                  <li>
                    <Button btnSize="small">{border}</Button>
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryFull;
