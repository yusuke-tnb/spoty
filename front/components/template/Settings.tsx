import Link from "next/link";
import styled from "styled-components";

import { ICONS } from "../../utils";

interface IProps {
  logout(): void;
}

function SettingsTemplate(props: IProps) {
  return (
    <Wrapper>
      <ul>
        <li>
          <Link href="/privacy-policy">
            <a>プライバシーポリシー</a>
          </Link>
          <ICONS.ChevronRight />
        </li>
        <li>
          <Link href="/contact">
            <a>お問い合わせ</a>
          </Link>
          <ICONS.ChevronRight />
        </li>
        <li>
          <a onClick={props.logout}>ログアウト</a>
          <ICONS.ChevronRight />
        </li>
      </ul>
    </Wrapper>
  );
}

export default SettingsTemplate;

const Wrapper = styled.div`
  min-height: calc(100vh - 44px);
  background-color: #fff;
  color: #444;

  ul {
    li {
      position: relative;
      cursor: pointer;
      height: 48px;
      line-height: 48px;
      padding: 0 16px;
      border-bottom: 1px solid #ccc;

      a {
        display: block;
        color: #444;
        text-decoration: none;
      }

      svg {
        position: absolute;
        right: 16px;
        top: 12px;
        fill: #666;
        height: 24px;
        width: 24px;
      }
    }
  }
`;
