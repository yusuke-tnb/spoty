import Router from "next/router";
import styled from "styled-components";
import { COLORS, ICONS } from "../utils";

interface IProps {
  title: string;
}

export default function HeaderSimple(props: IProps) {
  const back = () => Router.back();

  return (
    <HeaderWrapper>
      <button onClick={back}>
        <ICONS.ChevronLeft />
      </button>
      <h1>{props.title}</h1>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: relative;
  height: 44px;
  background-color: ${COLORS.main};
  color: #fff;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    position: absolute;
    top: 7px;
    left: 16px;
    height: 32px;
    width: 32px;
    background-color: transparent;

    svg {
      fill: #fff;
      height: 32px;
      width: 32px;
    }
  }

  h1 {
    text-align: center;
    font-size: 18px;
  }
`;
