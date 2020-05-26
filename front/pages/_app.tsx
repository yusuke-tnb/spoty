import App, { Container } from "next/app";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import { Provider } from "mobx-react";
// import DevTools from "mobx-react-devtools";
import * as Sentry from "@sentry/browser";
import NProgress from "nprogress";

import stores from "../stores";
import api from "../services/api";
import firebase from "../services/firebase";
import Notifier from "../components/Notifier";
import LaunchScreen from "../components/LaunchScreen";
import ErrorBoundary from "../lib/ExampleBoundary";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App<{}> {
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV === "production") {
      Sentry.init({
        dsn: "https://83332814d02f4079b9ba0b2e89fb7bbd@sentry.io/1340281"
      });

      Router.events.on("routeChangeComplete", url => {
        // https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications?hl=ja#tracking_virtual_pageviews
        const gtag = window.gtag;
        gtag("config", "UA-127635446-1", { page_path: url });
      });
    }
  }

  async componentDidMount() {
    NProgress.start();
    try {
      const { jwtToken, userId } = await this.login({
        firebaseUid: localStorage.firebaseUid
      });

      localStorage.setItem("jwtToken", jwtToken);

      stores.user.setData({
        userId,
        firebaseUid: localStorage.firebaseUid,
        name: localStorage.displayName,
        iconUrl: localStorage.photoURL
      });
    } catch (err) {
      console.error(err);
      Router.replace("/");
    }
    NProgress.done();
    stores.user.setLoading(false);
  }

  login = async ({ firebaseUid }) => {
    const { jwtToken, userId } = await api.login({ firebaseUid });

    return { jwtToken, userId };
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ErrorBoundary>
        <Container>
          <Head>
            <meta
              name="description"
              content="spoty は近くの暇な友達が見つかるサービスです。暇を登録して、SNS上の友達と交流しよう！"
            />
            <meta
              property="og:title"
              content='"いま" 会える友達が見つかるアプリ -spoty-'
            />
            <meta
              property="og:image"
              content="https://spotyapp.jp/static/ogp.png"
            />
            {/* <meta property="fb:app_id" content="1234567890" /> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@spoty_app" />
            <meta
              name="twitter:title"
              content='"いま" 会える友達が見つかるアプリ -spoty-'
            />
            <meta
              name="twitter:description"
              content="spoty は近くの暇な友達が見つかるサービスです。暇を登録して、SNS上の友達と交流しよう！"
            />
            <meta
              name="twitter:image"
              content="https://spotyapp.jp/static/ogp.png"
            />
            <title>spoty</title>
          </Head>
          <Provider {...stores}>
            <>
              <Component {...pageProps} />
              <LaunchScreen user={stores.user} />
              <Notifier />
            </>
          </Provider>
          {/* <DevTools /> */}
        </Container>
      </ErrorBoundary>
    );
  }
}

export default MyApp;
