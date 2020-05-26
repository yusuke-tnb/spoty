import * as React from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  isFocused?: boolean;
  className?: string;
  onClick?(): void;
  children: React.ReactNode;
}

export default function PseudoInput(props: IProps) {
  return (
    <StyledPseudoInput
      onClick={props.onClick}
      isFocused={props.isFocused}
      className={"PseudoInput " + props.className}
    >
      <div className="input-content">{props.children}</div>
      <div className="pseudo-cursor" />
    </StyledPseudoInput>
  );
}

const flash = keyframes`
  49% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledPseudoInput = styled.div`
  position: relative;
  width: 100%;
  height: 32px;
  border: 0;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 0 0 12px;
  margin: 0;
  font-size: 14px;
  transition: all 0.15s ease-in-out;

  > .input-content {
    height: 100%;
    display: flex;
    align-items: center;
    overflow-x: scroll;

    > ul {
      display: flex;
    }

    > .placeholder {
      position: absolute;
      color: #666;
      padding-left: 4px;
      width: 90%;

      > .half {
        width: 50%;
        display: inline-block;

        &:last-of-type {
          border-left: 1px solid #ccc;
          padding-left: 12px;
        }
      }
    }
  }

  > .pseudo-cursor {
    width: ${(p: IProps) => (p.isFocused ? "2px" : "0")};
    height: 68%;
    background-color: #3cacde;
    animation: ${flash} 1.2s linear 0s infinite;
  }
`;
