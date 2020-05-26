import * as React from "react";
import { inject, observer } from "mobx-react";
import Router from "next/router";

import { UserStore } from "../../stores/user";
import { NotifierStore } from "../../stores/notifier";

import SettingsTemplate from "../../components/template/Settings";
import HeaderSimple from "../../components/HeaderSimple";

import firebase from "../../services/firebase";

interface IProps {
  user: UserStore;
  notifier: NotifierStore;
}

@inject("user", "notifier")
@observer
export default class Settings extends React.Component<IProps> {
  logout = async () => {
    try {
      await firebase.logout();
      this.props.user.logout();

      localStorage.removeItem("jwtToken");
      localStorage.removeItem("firebaseUid");
      localStorage.removeItem("name");
      localStorage.removeItem("iconUrl");

      this.props.notifier.open({ message: "ログアウトしました" });
      Router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  public render() {
    return (
      <>
        <HeaderSimple title="設定" />
        <SettingsTemplate logout={this.logout} />
      </>
    );
  }
}
