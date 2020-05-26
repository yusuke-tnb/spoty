import React from "react";
import { observer, inject } from "mobx-react";
import { NotifierStore } from "../stores/notifier";
import ContactTemplate from "../components/template/Contact";
import HeaderSimple from "../components/HeaderSimple";
import api from "../services/api";

interface IProps {
  notifier: NotifierStore;
}

@inject("notifier")
@observer
export default class Contact extends React.Component<IProps> {
  state = { content: "" };

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  send = async () => {
    if (!this.state.content) return;
    try {
      await api.sendInquiry({ content: this.state.content });
      this.props.notifier.open({ message: "送信が完了しました！" });
    } catch (err) {
      console.log(err)
      this.props.notifier.open({
        message: (
          <>
            送信に失敗しました。
            <br />
            時間を空けて再度お試しください。
          </>
        ),
        variant: "error"
      });
    }
  };

  public render() {
    return (
      <>
        <HeaderSimple title="お問い合わせ" />
        <ContactTemplate
          send={this.send}
          handleChange={this.handleChange}
          content={this.state.content}
        />
      </>
    );
  }
}
