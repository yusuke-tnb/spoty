import { observer } from "mobx-react";
import styled from "styled-components";
import { ICONS, getGoalIcon } from "../utils";
import { Area, Goal, Categories } from "../models";

interface IProps {
  category: Categories;
  suffix?: string;
  items: Area[] | Goal[];
  selectedItemIds: string[];
  clickClose(item: Area | Goal): void;
}

function TagList(props: IProps) {
  return (
    <>
      {props.selectedItemIds
        .map(id => props.items.find((item: Area | Goal) => id === item.id))
        .map((item: Area | Goal) => {
          const Icon =
            props.category === "areas"
              ? ICONS.Location
              : getGoalIcon(item.name);
          return (
            <ListItemWrapper key={item.id}>
              {Icon && <Icon className="icon" />}
              {item.name + (props.suffix || "")}
              <button onClick={() => props.clickClose(item)}>
                <ICONS.Close className="close-icon" />
              </button>
            </ListItemWrapper>
          );
        })}
    </>
  );
}
export default observer(TagList);

const ListItemWrapper = styled.li`
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  line-height: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  margin: 0 12px 0 2px;
  padding: 0 4px 0 8px;
  white-space: nowrap;

  > svg {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    fill: #888;
  }

  > button {
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 6px;

    > .close-icon {
      font-size: 14px;
      fill: #666;
      cursor: pointer;
    }
  }
`;
