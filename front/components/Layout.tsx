import React, { ReactNode } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { UserStore } from "../stores/user";
import Header from "./Header";
import Spotter from "./Spotter";

interface IProps {
  user: UserStore;
  children: ReactNode;
  onClickHeaderLogo?(): void;
}

function Layout(props: IProps) {
  return (
    <Wrapper>
      <HeaderWrapper>
        <Header user={props.user} onClickHeaderLogo={props.onClickHeaderLogo} />
        <Spotter />
      </HeaderWrapper>
      <ContentWrapper>{props.children}</ContentWrapper>
    </Wrapper>
  );
}
export default observer(Layout);

const Wrapper = styled.div`
  min-height: 100vh;
`;

const HeaderWrapper = styled.div``;

const ContentWrapper = styled.div`
  height: calc(100vh - 109px);
`;
