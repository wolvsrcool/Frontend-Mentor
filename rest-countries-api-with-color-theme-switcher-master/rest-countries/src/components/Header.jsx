import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header({ resetAll }) {
  const [theme, setTheme] = useState(function () {
    return localStorage.getItem("theme") ?? "light";
  });

  const navigate = useNavigate();

  useEffect(
    function () {
      const buttons = document.querySelectorAll("button");
      buttons.forEach((btn) => btn.classList.add(`notransitions`));
      const bodyEl = document.querySelector(`body`);
      if (theme === "dark") {
        bodyEl.classList.add(`dark`);
        bodyEl.classList.remove(`light`);
      } else {
        bodyEl.classList.add(`light`);
        bodyEl.classList.remove(`dark`);
      }
      setTimeout(
        () => buttons.forEach((btn) => btn.classList.remove(`notransitions`)),
        10
      );
    },
    [theme]
  );

  function setThemeStorage() {
    if (theme === `light`) {
      setTheme(`dark`);
      localStorage.setItem("theme", "dark");
    }
    if (theme === `dark`) {
      setTheme(`light`);
      localStorage.setItem("theme", "light");
    }
  }

  function handleClick() {
    resetAll();
    navigate("/?region=reset", { replace: true });
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1 onClick={handleClick}>Where in the world?</h1>

        <button onClick={setThemeStorage}>
          <div className={styles.icon}>
            {theme === `light` ? (
              <ion-icon name="moon-outline"></ion-icon>
            ) : (
              <ion-icon name="moon"></ion-icon>
            )}
          </div>

          <p>Dark Mode</p>
        </button>
      </div>
    </header>
  );
}

export default Header;
