import React from "react";
import { Link } from "react-router-dom";
import styles from "./error.module.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const E404 = () => {
  let navigate = useNavigate();
  const userDetails = useSelector((state) => state.root.userDetails);
  const isLogin = useSelector((state) => state.root.isLogin);

  return (
    <div>
      {isLogin &&
      Object.keys(userDetails).length === 0 &&
      localStorage.getItem("token").length > 0 &&
      userDetails?.roleType === undefined ? (
        <div id="loading-wrapper">
          <div className="spinner-border text-apex-green" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className={styles.errorbody}>
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
      )}
    </div>
  );
};

export default E404;
