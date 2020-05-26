import * as React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { PontanTypeType } from "../stores/modals";
import Portal from "./Portal";
import { ICONS } from "../utils";

interface IProps {
  isOpened: boolean;
  pontanType: PontanTypeType;
  close?(): void;
  children: React.ReactNode;
}

function BasicModal(props: IProps) {
  if (!props.isOpened) return null;

  return (
    <Portal selector="#modal">
      <Dialog open={true} onClose={props.close}>
        <ContentWrapper>
          {props.close && (
            <button className="close-button" onClick={props.close}>
              <ICONS.Close />
            </button>
          )}

          {props.pontanType && (
            <img
              className="pontan-img"
              src={`/static/pontan-${props.pontanType}.svg`}
              alt=""
            />
          )}
          <div className="content">{props.children}</div>
        </ContentWrapper>
      </Dialog>
    </Portal>
  );
}
export default observer(BasicModal);

const ContentWrapper = styled.div`
  padding: 32px;

  > .close-button {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: transparent;
  }

  > .pontan-img {
    width: 64%;
    margin: 4px auto 16px;
    display: block;
  }
`;
