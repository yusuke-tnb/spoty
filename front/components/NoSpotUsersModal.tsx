import * as React from "react";
import Router from "next/router";
import styled from "styled-components";
import { observer, inject } from "mobx-react";

import BasicModal from "./BasicModal";
import { COLORS, getTwitterShareUrl } from "../utils";
import { ModalsStore } from "../stores/modals";
import { SpotterStore } from "../stores/spotter";

interface IProps {
  modals: ModalsStore;
  spotter: SpotterStore;
}

@inject("modals", "spotter")
@observer
class NoSpotUsersModal extends React.Component<IProps> {
  back = () => Router.back();

  render() {
    const areas = (this.props.spotter.areas || []).filter(area =>
      this.props.spotter.selectedItemIds.areas.includes(area.id)
    );

    return (
      <BasicModal
        isOpened={this.props.modals.noSpotUsersModal.isOpened}
        pontanType={this.props.modals.noSpotUsersModal.pontanType}
        close={this.back}
      >
        <ContentWrapper>
          条件に合う人がいません...
          <br />
          Tweet して暇な友達を
          <br />
          探してみましょう！
          <button
            onClick={() => {
              window.open(getTwitterShareUrl(areas), "_blank");
              this.back();
            }}
          >
            Tweetする！
          </button>
        </ContentWrapper>
      </BasicModal>
    );
  }
}

export default NoSpotUsersModal;

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
