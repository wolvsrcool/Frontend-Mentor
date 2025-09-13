import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import AllCountries from "./pages/AllCountries";
import SelectedCountry from "./pages/SelectedCountry";
import Layout from "./components/Layout.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sortingBy, setSortingBy] = useState({
    field: `population`,
    order: true,
  });

  function resetAll() {
    setQuery("");
    setFilter("");
    setSortingBy({ field: "population", order: true });
  }

  useEffect(
    function () {
      async function getCountries() {
        setIsLoading(true);
        try {
          const res = await fetch(
            "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital"
          );
          const data = await res.json();

          setCountries(data);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (countries.length === 0) getCountries();

      countries.forEach((c) => {
        const img = new Image();
        img.src = c.flags.svg;
      });
    },
    [countries]
  );

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout filter={filter} resetAll={resetAll} />,
        children: [
          {
            index: true,
            element: (
              <AllCountries
                query={query}
                setQuery={setQuery}
                filter={filter}
                sortingBy={sortingBy}
                setSortingBy={setSortingBy}
                setFilter={setFilter}
                isLoading={isLoading}
                countries={countries}
              />
            ),
          },
          {
            path: ":countryName",
            element: <SelectedCountry countries={countries}></SelectedCountry>,
          },
        ],
      },
    ],
    {
      basename: "/Frontend-Mentor/rest-countries",
    }
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
