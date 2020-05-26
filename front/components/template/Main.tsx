import { observer } from "mobx-react";
import styled, { css } from "styled-components";

import { Categories } from "../../models";
import { COLORS } from "../../utils";
import PseudoInput from "../PseudoInput";
import TagList from "../TagList";

import { SpotterStore } from "../../stores/spotter";

interface IProps {
  spotter: SpotterStore;
}

function MainTemplate(props: IProps) {
  const { areas, goals, selectedItemIds } = props.spotter;

  const isButtonDisabled = !selectedItemIds.areas.length;
  const handleClickInput = (category: Categories) => {
    props.spotter.toggle();
    props.spotter.switchCategory(category);
  };

  return (
    <Wrapper>
      <img className="logo" src="/static/logo-large.svg" />
      <div className="input-wrapper">
        <PseudoInput onClick={() => handleClickInput("areas")}>
          {selectedItemIds.areas.length ? (
            <ul>
              <TagList
                category="areas"
                suffix="エリア"
                items={areas || []}
                selectedItemIds={selectedItemIds.areas}
                clickClose={props.spotter.deselectItem}
              />
            </ul>
          ) : (
            <span className="placeholder">エリア</span>
          )}
        </PseudoInput>
        <PseudoInput onClick={() => handleClickInput("goals")}>
          {selectedItemIds.goals.length ? (
            <ul>
              <TagList
                category="goals"
                items={goals || []}
                selectedItemIds={selectedItemIds.goals}
                clickClose={props.spotter.deselectItem}
              />
            </ul>
          ) : (
            <span className="placeholder">目的・絞り込み</span>
          )}
        </PseudoInput>

        <Button onClick={props.spotter.spot} isDisabled={isButtonDisabled}>
          これで spot する
        </Button>
      </div>
    </Wrapper>
  );
}
export default observer(MainTemplate);

const Wrapper = styled.div`
  height: 100%;
  background-color: ${COLORS.main};
  padding: 0 24px;

  .logo {
    display: block;
    margin: 0 auto;
    padding: 32px 0;
  }

  .input-wrapper {
    > div {
      margin: 8px 0;
    }
  }
`;

interface IButtonProps {
  isDisabled: boolean;
}
const Button = styled.button`
  display: block;
  width: 80%;
  background-color: ${COLORS.yellow};
  margin: 16px auto;
  padding: 8px 24px;
  border-radius: 9999px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);

  ${(p: IButtonProps) =>
    p.isDisabled &&
    css`
      opacity: 0.5;
      box-shadow: none;
      cursor: default;
    `}
`;
