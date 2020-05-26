import * as React from "react";
import styled, { css } from "styled-components";
import { observer } from "mobx-react";

import { COLORS } from "../utils";
import { UserStore } from "../stores/user";

interface IProps {
  user: UserStore;
}

function LaunchScreen(props: IProps) {
  return (
    <Wrapper isShowing={props.user.isLoading}>
      <div className="inner">
        <div className="logo">spoty</div>
        <div className="text">"いま" 会える友達が見つかるアプリ</div>
      </div>
    </Wrapper>
  );
}
export default observer(LaunchScreen);

const Wrapper = styled.div`
  background-color: ${COLORS.main};
  color: #fff;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  visibility: visible;
  opacity: 1;
  transition: all 0.15s ease-out;

  ${(p: { isShowing: boolean }) =>
    !p.isShowing &&
    css`
      visibility: hidden;
      opacity: 0;
    `}

  > img {
    height: 80px;
    width: 80px;
    margin-bottom: 40px;
  }

  > .inner {
    text-align: center;

    > .logo {
      font-family: "Avenir";
      font-size: 60px;
      font-weight: 800;
    }

    > .text {
      font-size: 14px;
    }
  }
`;
