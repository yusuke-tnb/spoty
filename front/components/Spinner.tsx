import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Spinner({ color = "#fff" }) {
  return (
    <Wrapper>
      <CircularProgress
        size={48}
        thickness={4}
        style={{ color, marginBottom: "24%" }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;
