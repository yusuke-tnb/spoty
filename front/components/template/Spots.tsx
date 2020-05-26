import { observer } from "mobx-react";
import styled from "styled-components";
import { SpotterStore } from "../../stores/spotter";
import UserList from "../UserList";
import { COLORS } from "../../utils";

interface IProps {
  spotter: SpotterStore;
  users: any[];
  openPokeModal(targetUser: any): void;
}

function SpotsTemplate(props: IProps) {
  return (
    <Wrapper>
      <ul>
        <UserList
          open={props.openPokeModal}
          users={props.users.map(user => ({
            ...user,
            key: user.userId,
            areas: (props.spotter.areas || []).filter(area =>
              user.areaIds.includes(area.id)
            ),
            goals: (props.spotter.goals || []).filter(goal =>
              user.goalIds.includes(goal.id)
            )
          }))}
        />
      </ul>
    </Wrapper>
  );
}

export default observer(SpotsTemplate);

const Wrapper = styled.div`
  height: 100%;
  background-color: ${COLORS.lightGray};
  padding: 16px;
`;
