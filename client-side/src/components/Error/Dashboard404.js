import React from "react";
import { Link } from "react-router-dom";
import styles from "./error.module.css";
import { useNavigate } from "react-router";

const DashboardError = () => {
  let navigate = useNavigate();

  return (
    <div className={styles.dashboardError}>
      <div className={styles.bubble}></div>
      <div className={styles.bubble}></div>
      <div className={styles.bubble}></div>
      <div className={styles.bubble}></div>
      <div className={styles.bubble}></div>

      <div className={styles.main}>
        <h1 className={styles.errorh1}>404</h1>
        <p className={styles.errorp}>
          We're sorry but it looks
          <br />
          like that page doesn't exist anymore.
        </p>
        <Link className={styles.errora} to={() => navigate(-1)}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default DashboardError;
