import React from "react";
import { inject, observer } from "mobx-react";
import NProgress from "nprogress";

import { UserStore } from "../stores/user";
import { SpotterStore } from "../stores/spotter";
import { NotifierStore } from "../stores/notifier";
import { ModalsStore } from "../stores/modals";

import MainTemplate from "../components/template/Main";
import LandingPageTemplage from "../components/template/LandingPage";
import Layout from "../components/Layout";

import api from "../services/api";
import firebase from "../services/firebase";

interface IProps {
  user: UserStore;
  spotter: SpotterStore;
  notifier: NotifierStore;
  modals: ModalsStore;
}

@inject("user", "spotter", "notifier", "modals")
@observer
export default class Main extends React.Component<IProps> {
  handleLogin = async () => {
    try {
      NProgress.start();
      this.props.user.setLoading(true);

      const res = await firebase.login();
      if (
        !(
          res &&
          res.user &&
          res.credential &&
          res.additionalUserInfo &&
          res.additionalUserInfo.profile
        )
      ) {
        return;
      }

      const { jwtToken, userId } = await this.login({
        user: res.user,
        additionalUserInfo: res.additionalUserInfo,
        credential: res.credential
      });

      // 通知
      this.props.notifier.open({ message: "ログインしました" });

      // もろもろ localStorage に突っ込んでおく
      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("firebaseUid", res.user.uid);
      res.user.displayName &&
        localStorage.setItem("name", res.user.displayName);
      res.user.photoURL && localStorage.setItem("iconUrl", res.user.photoURL);

      this.props.user.setData({
        userId,
        firebaseUid: res.user.uid,
        name: res.additionalUserInfo.profile.name,
        iconUrl: res.user.photoURL || "",
        bannerUrl: res.additionalUserInfo.profile.profile_banner_url,
        twitterId: res.user.displayName || undefined
      });
    } catch (err) {
      console.error("Err handleLogin", err);
      this.props.notifier.open({
        message: (
          <>
            ログインできませんでした。
            <br />
            時間を空けて再度お試しください。
          </>
        ),
        variant: "error"
      });
    } finally {
      NProgress.done();
      this.props.user.setLoading(false);
    }
  };

  login = async ({ user, additionalUserInfo, credential }) => {
    const { jwtToken, userId } = await api.login({
      firebaseUid: user.uid,
      displayName: user.displayName,
      screenName: additionalUserInfo.profile.screen_name,
      icon: user.photoURL,
      banner: additionalUserInfo.profile.profile_banner_url,
      accessToken: credential.accessToken,
      secret: credential.secret,
      idNumStr: additionalUserInfo.profile.id_str,
      email: user.email
    });

    return { jwtToken, userId };
  };

  public render() {
    const isLoggedin = this.props.user.isLoggedin;
    if (!isLoggedin) {
      return <LandingPageTemplage login={this.handleLogin} />;
    }
    return (
      <Layout
        user={this.props.user}
        onClickHeaderLogo={this.props.spotter.deselectAllItems}
      >
        <MainTemplate spotter={this.props.spotter} />
      </Layout>
    );
  }
}
