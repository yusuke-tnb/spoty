import React from "react";
import { inject, observer } from "mobx-react";

import { UserStore } from "../../stores/user";
import { NotifierStore } from "../../stores/notifier";

import SettingsEmailTemplate from "../../components/template/SettingsEmail";
import HeaderSimple from "../../components/HeaderSimple";

import api from "../../services/api";

interface IProps {
  user: UserStore;
  notifier: NotifierStore;
}

@inject("user", "notifier")
@observer
export default class SettingsEmail extends React.Component<IProps> {
  state = { email: "" };

  updateEmail = () => {
    api
      .updateEmail({ email: this.state.email })
      .then(() => {
        this.props.notifier.open({ message: "変更が完了しました" });
        this.props.user.setData({ email: this.state.email });
      })
      .catch(() => {
        this.props.notifier.open({
          message: (
            <>
              変更に失敗しました。
              <br />
              時間を空けて再度お試しください。
            </>
          ),
          variant: "error"
        });
      });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  public render() {
    return (
      <>
        <HeaderSimple title="メールアドレス設定" />
        <SettingsEmailTemplate
          user={this.props.user}
          updateEmail={this.updateEmail}
          handleChange={this.handleChange}
        />
      </>
    );
  }
}
