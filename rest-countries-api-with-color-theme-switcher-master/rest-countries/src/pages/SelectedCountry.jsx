import CountryFull from "../components/CountryFull";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import styles from "./SelectedCountry.module.css";

function SelectedCountry() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Button onClick={() => navigate("/")} size="medium">
        <ion-icon name="arrow-back-sharp"></ion-icon> Back
      </Button>

      <CountryFull />
    </div>
  );
}

export default SelectedCountry;
