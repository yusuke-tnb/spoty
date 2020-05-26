import * as React from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";

import BasicModal from "./BasicModal";
import { COLORS } from "../utils";
import { ModalsStore } from "../stores/modals";
import { NotifierStore } from "../stores/notifier";

import api from "../services/api";

interface IProps {
  modals: ModalsStore;
  notifier: NotifierStore;
}

@inject("modals", "notifier")
@observer
class PokeModal extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  poke = async targetId => {
    try {
      await api.poke({ targetId });
      this.props.notifier.open({ message: "poke しました！" });
      this.close();
    } catch (err) {
      this.props.notifier.open({
        message: (
          <>
            poke に失敗しました。
            <br />
            時間を空けて再度お試しください。
          </>
        ),
        variant: "error"
      });
    }
  };

  close = () => {
    this.props.modals.close("pokeModal");
  };

  render() {
    return (
      <BasicModal
        isOpened={this.props.modals.pokeModal.isOpened}
        pontanType={this.props.modals.pokeModal.pontanType}
        close={this.close}
      >
        <ContentWrapper>
          {this.props.modals.pokeModal.targetUser.name} さんに
          <br />
          poke しますか？
          <button
            onClick={() =>
              this.poke(this.props.modals.pokeModal.targetUser.userId)
            }
          >
            pokeしてみる
          </button>
        </ContentWrapper>
      </BasicModal>
    );
  }
}

export default PokeModal;

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
