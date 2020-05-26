import { observer } from "mobx-react";
import styled from "styled-components";
import { UserStore } from "../../stores/user";

import { COLORS } from "../../utils";

interface IProps {
  user: UserStore;
  updateEmail(): void;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

function SettingsEmailTemplate(props: IProps) {
  return (
    <Wrapper>
      <div className="head">現在</div>
      <div className="value">{props.user.email}</div>
      <div className="head">新規</div>
      <div className="value">
        <form
          onSubmit={e => {
            e.preventDefault();
            props.updateEmail();
          }}
        >
          <input
            type="email"
            placeholder="メールアドレス"
            onChange={props.handleChange}
          />
          <button>変更する</button>
        </form>
      </div>
      <div className="note">
        ※&nbsp;登録されたメールアドレスは&nbsp;spoty&nbsp;上では公開されません。
        <br />
        ※&nbsp;受け取った&nbsp;poke&nbsp;と友達の&nbsp;spot&nbsp;情報のみが登録されたメールアドレスに通知されます。
      </div>
    </Wrapper>
  );
}
export default observer(SettingsEmailTemplate);

const Wrapper = styled.div`
  min-height: calc(100vh - 44px);
  color: #444;
  background-color: ${COLORS.lightGray};
  padding: 16px;

  .head {
    margin: 0.5em 0 0.2em;
    font-weight: 400;
  }

  .value {
    margin-bottom: 1.5em;
  }

  form {
    display: flex;

    input {
      width: 100%;
      outline: 0;
      border-width: 0 0 2px;
      border-color: #ccc;
      background-color: inherit;
      border-radius: 0;
    }

    button {
      width: 120px;
      background-color: ${COLORS.main};
      margin-left: 16px;
      padding: 0.3em 1em;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
    }
  }

  .note {
    font-size: 12px;
    margin-top: -1em;
  }
`;
