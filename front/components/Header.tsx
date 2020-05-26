import Link from "next/link";
import { observer } from "mobx-react";
import styled from "styled-components";
import { UserStore } from "../stores/user";
import { COLORS } from "../utils";

interface IProps {
  user: UserStore;
  onClickHeaderLogo?(): void;
}

function Header(props: IProps) {
  const { lastCheckPokeTime, lastPokedTime } = props.user;
  const hasUnreadPoke = !!(
    lastCheckPokeTime &&
    lastPokedTime &&
    lastCheckPokeTime < lastPokedTime
  );

  return (
    <HeaderWrapper hasUnreadPoke={hasUnreadPoke}>
      <span className="logo-and-copy">
        <Link href="/">
          <a className="logo" onClick={props.onClickHeaderLogo}>
            spoty
          </a>
        </Link>
        <span className="copy">
          "いま" 会える友達が
          <br />
          見つかるアプリ
        </span>
      </span>
      <Link href="/mypage">
        <a className="user-icon">
          <img src={props.user.iconUrl} alt="ユーザーアイコン" />
        </a>
      </Link>
    </HeaderWrapper>
  );
}
export default observer(Header);

interface HeaderWrapperProps {
  hasUnreadPoke: boolean;
}
const HeaderWrapper = styled.header`
  height: 60px;
  background-color: ${COLORS.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 24px;

  > .logo-and-copy {
    display: flex;
    align-items: center;

    .logo {
      text-decoration: none;
      color: #fff;
      font-size: 24px;
      line-height: 1;
      font-weight: 800;
      font-family: "Avenir";
    }

    .copy {
      font-size: 10px;
      margin-left: 10px;
      color: rgba(255, 255, 255, 0.95);
    }
  }

  .user-icon {
    position: relative;
    height: 40px;
    width: 40px;

    &::after {
      content: "";
      height: 8px;
      width: 8px;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 999px;
      background-color: ${COLORS.red};
      border: 2px solid ${COLORS.main};
      display: ${(p: HeaderWrapperProps) =>
        p.hasUnreadPoke ? "initial" : "none"};
    }

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
`;
