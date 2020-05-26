import React from "react";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";

import { COLORS, ICONS, getGoalIcon } from "../utils";
import PseudoInput from "./PseudoInput";
import TagList from "./TagList";
import api from "../services/api";
import { SpotterStore } from "../stores/spotter";
import { NotifierStore } from "../stores/notifier";
import { ModalsStore } from "../stores/modals";

interface IProps {
  spotter: SpotterStore;
  notifier: NotifierStore;
  modals: ModalsStore;
}

@inject("spotter", "notifier", "modals")
@observer
export default class Spotter extends React.Component<IProps> {
  async componentDidMount() {
    if (!this.props.spotter.areas || !this.props.spotter.goals) {
      const [areas, goals] = await Promise.all([
        api.getAreas(),
        api.getGoals()
      ]);
      this.props.spotter.setItems(areas, goals);
    }
  }

  componentDidUpdate() {
    this.scrollSelectedCategoryPseudoInput();
  }

  scrollSelectedCategoryPseudoInput = () => {
    const pseudoInput = document.querySelector(
      `.PseudoInput.${this.props.spotter.selectedCategory}`
    );
    const scrollableWindow =
      pseudoInput && pseudoInput.querySelector(".input-content");
    if (scrollableWindow) scrollableWindow.scroll(10000, 0);
  };

  render() {
    const { areas, goals, selectedItemIds } = this.props.spotter;

    const isButtonDisabled = !selectedItemIds.areas.length;

    return (
      <>
        <ActiveWrapper isActive={this.props.spotter.isActive}>
          <div className="header">
            <ICONS.Close
              className="close-icon"
              onClick={this.props.spotter.toggle}
            />
            <div className="input-wrapper">
              <PseudoInput
                className="areas"
                onClick={() => this.props.spotter.switchCategory("areas")}
                isFocused={this.props.spotter.selectedCategory === "areas"}
              >
                {selectedItemIds.areas.length ? (
                  <ul>
                    <TagList
                      category="areas"
                      suffix="エリア"
                      items={areas || []}
                      selectedItemIds={selectedItemIds.areas}
                      clickClose={this.props.spotter.deselectItem}
                    />
                  </ul>
                ) : (
                  <span className="placeholder">エリア</span>
                )}
              </PseudoInput>
              <PseudoInput
                className="goals"
                onClick={() => this.props.spotter.switchCategory("goals")}
                isFocused={this.props.spotter.selectedCategory === "goals"}
              >
                {selectedItemIds.goals.length ? (
                  <ul>
                    <TagList
                      category="goals"
                      items={goals || []}
                      selectedItemIds={selectedItemIds.goals}
                      clickClose={this.props.spotter.deselectItem}
                    />
                  </ul>
                ) : (
                  <span className="placeholder">目的・絞り込み</span>
                )}
              </PseudoInput>
            </div>
          </div>

          <div className="content">
            <ul>
              {this.props.spotter.selectedCategoryItems.map(el => {
                const Icon =
                  this.props.spotter.selectedCategory === "areas"
                    ? ICONS.Location
                    : getGoalIcon(el.name);
                return (
                  <li
                    key={el.id}
                    onClick={() => this.props.spotter.selectItem(el)}
                  >
                    {Icon && <Icon className="icon" />}
                    {el.name}
                  </li>
                );
              })}
            </ul>

            <Button
              onClick={this.props.spotter.spot}
              isDisabled={isButtonDisabled}
            >
              これで spot する
            </Button>
          </div>
        </ActiveWrapper>

        <InactiveWrapper>
          <PseudoInput onClick={this.props.spotter.toggle}>
            {selectedItemIds.areas.length || selectedItemIds.goals.length ? (
              <ul>
                <TagList
                  category="areas"
                  suffix="エリア"
                  items={areas || []}
                  selectedItemIds={selectedItemIds.areas}
                  clickClose={this.props.spotter.deselectItem}
                />
                <TagList
                  category="goals"
                  items={goals || []}
                  selectedItemIds={selectedItemIds.goals}
                  clickClose={this.props.spotter.deselectItem}
                />
              </ul>
            ) : (
              <span className="placeholder">
                <span className="half">エリア</span>
                <span className="half">目的・絞り込み</span>
              </span>
            )}
          </PseudoInput>
        </InactiveWrapper>
      </>
    );
  }
}

const commonWrapperStyle = css`
  position: relative;
  background-color: ${COLORS.main};
  padding: 0 24px;
`;

interface IActiveWrapperProps {
  isActive: boolean;
}
const ActiveWrapper = styled.div`
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  max-width: 500px;
  margin: 0 auto;
  opacity: ${(p: IActiveWrapperProps) => (p.isActive ? 1 : 0)};
  visibility: ${(p: IActiveWrapperProps) =>
    p.isActive ? "initial" : "hidden"};
  transition: all 0.15s ease-out;

  .header {
    ${commonWrapperStyle};
    display: flex;
    padding: 4px 24px 4px 0;

    > .close-icon {
      margin: 8px;
      font-size: 32px;
      fill: #fff;
      cursor: pointer;
    }

    .input-wrapper {
      width: calc(100% - 48px);

      > div {
        margin: 8px 0;
      }
    }
  }

  .content {
    background-color: #fff;
    height: calc(100vh - 96px);

    ul {
      padding-top: ${(p: IActiveWrapperProps) => (p.isActive ? 0 : "24px")};
      transition: all 0.15s ease-out;

      li {
        height: 44px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding: 0 16px;
        cursor: pointer;

        .icon {
          margin-right: 8px;
          fill: #666;
        }
      }
    }
  }
`;

interface IButtonProps {
  isDisabled: boolean;
}
const Button = styled.button`
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  width: 60%;
  max-width: 300px;
  background-color: ${COLORS.yellow};
  margin: 0 auto;
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

const InactiveWrapper = styled.div`
  ${commonWrapperStyle};
  padding-bottom: 8px;
  border-bottom: 1px solid #3577b2;
  display: flex;
  align-items: center;
  z-index: 1000;

  > div {
    margin: 0 0 8px 0;
  }
`;
