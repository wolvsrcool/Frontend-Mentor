import { Outlet } from "react-router";
import { ScrollRestoration, useSearchParams } from "react-router-dom";
import styles from "./Layout.module.css";
import Header from "./Header";
import { useEffect } from "react";

function Layout({ filter, resetAll }) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(
    function () {
      const curRegion = searchParams.get(`region`);
      if (filter !== curRegion) {
        if (filter) setSearchParams({ region: filter }, { replace: true });
      }
    },
    [filter, searchParams, setSearchParams]
  );

  return (
    <div>
      <Header resetAll={resetAll}></Header>
      <div className={styles.container}>
        <Outlet></Outlet>
        <ScrollRestoration
          getKey={(loc) => {
            console.log(loc);
            if (loc.search === "?region=reset") {
              loc.search = "";
              return loc.key;
            }
            if (loc.pathname === "/") return "home";
            return "others";
          }}
        ></ScrollRestoration>
      </div>
    </div>
  );
}

export default Layout;
