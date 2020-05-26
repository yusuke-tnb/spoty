import * as React from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";

import BasicModal from "./BasicModal";
import { COLORS } from "../utils";
import { ModalsStore } from "../stores/modals";

interface IProps {
  modals: ModalsStore;
}

@inject("modals")
@observer
class MeetUpModal extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  meetUp = () => {
    window.open(
      `https://twitter.com/messages/compose?recipient_id=${
        this.props.modals.meetUpModal.targetUser.idNumStr
      }&text=poke%E3%81%82%E3%82%8A%E3%81%8C%E3%81%A8%E3%81%86%E3%81%94%E3%81%96%E3%81%84%E3%81%BE%E3%81%99%EF%BC%81%0A%E5%90%88%E6%B5%81%E3%81%97%E3%81%BE%E3%81%97%E3%82%87%E3%81%86%EF%BC%81%0A%0Aspoty%E3%81%8B%E3%82%89%E9%80%81%E4%BF%A1`,
      "_blank"
    );
    this.close();
  };

  close = () => {
    this.props.modals.close("meetUpModal");
  };

  render() {
    return (
      <BasicModal
        isOpened={this.props.modals.meetUpModal.isOpened}
        pontanType={this.props.modals.meetUpModal.pontanType}
        close={this.close}
      >
        <ContentWrapper>
          {this.props.modals.meetUpModal.targetUser.name} さんと
          <br />
          合流しますか？
          <button onClick={this.meetUp}>合流する</button>
        </ContentWrapper>
      </BasicModal>
    );
  }
}

export default MeetUpModal;

const ContentWrapper = styled.div`
  font-size: 16px;
  text-align: center;

  > button {
    display: block;
    white-space: nowrap;
    min-width: 160px;
    background-color: ${COLORS.main};
    margin: 8px auto 0;
    padding: 8px 24px;
    border-radius: 9999px;
    font-size: 16px;
    color: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
  }
`;
