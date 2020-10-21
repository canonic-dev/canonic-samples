import React from "react";

import Layout from "@src/components/Layout";
import GoogleIcon from "@src/icons/google.svg";
import Bg from "@src/icons/bg.webp";
import useGetLoginUrlsForUser from "@src/api/useGetLoginUrls";

import styles from "./Login.module.scss";

const Login = ({ location }) => {
  const loginUrls = useGetLoginUrlsForUser();
  return (
    <Layout
      title="Movie Hunt | Login"
      description="MovieHunt is a canonic sample"
      url="https://moviehunt.canonic.dev"
      location={location}
      headerSwitchOffset={300}
      className={styles.login}
      type="NON_AUTH_ONLY"
    >
      <img src={Bg} className={styles.loginBg} />
      <div className={styles.loginCard}>
        <div className={styles.loginCardTitle}>Movie Hunt</div>
        <div className={styles.loginCardSmallSubtitle}>Login With</div>
        <div className={styles.loginCardButton}>
          <a href={loginUrls.GOOGLE}>
            <img src={GoogleIcon} /> Google
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
