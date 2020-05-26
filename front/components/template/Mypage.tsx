import Link from "next/link";
import { observer } from "mobx-react";
import styled from "styled-components";

import UserList from "../UserList";
import MeetUpModal from "../MeetUpModal";
import { ICONS, COLORS } from "../../utils";

import { ModalsStore } from "../../stores/modals";
import { UserStore } from "../../stores/user";
import { SpotterStore } from "../../stores/spotter";

import { PokeData } from "../../models";

interface IProps {
  modals: ModalsStore;
  user: UserStore;
  spotter: SpotterStore;
  pokeList: PokeData[];
}

function MypageTemplate(props: IProps) {
  const openMeetUpModal = targetUser => {
    props.modals.open("meetUpModal");
    props.modals.setModalData("meetUpModal", { targetUser });
  };

  return (
    <>
      <Wrapper>
        <div className="header">
          <img className="bg" src={props.user.bannerUrl} />
          <img className="icon" src={props.user.iconUrl} />
          <div className="profile-nav">
            <div className="top">
              <h1 className="name">{props.user.name}</h1>
              <Link href="/settings">
                <a>
                  <ICONS.ExpandMore />
                </a>
              </Link>
            </div>
            <div className="bottom">
              {props.user.email}
              <Link href="/settings/email">
                <a>変更する</a>
              </Link>
            </div>
          </div>
          <div className="app-nav">
            <div className="app-nav-item">
              <div>spotした回数</div>
              <div className="num">{props.user.spotCount}</div>
            </div>
            <div className="app-nav-item">
              <div>pokeされた回数</div>
              <div className="num">{props.user.pokeCount}</div>
            </div>
          </div>
        </div>

        <div className="content">
          <h2>pokeされている人</h2>
          {props.pokeList.length ? (
            <ul className="user-list">
              <UserList
                open={openMeetUpModal}
                users={props.pokeList.map(poke => ({
                  ...poke,
                  key: poke.pokeId,
                  areas: (props.spotter.areas || []).filter(area =>
                    poke.areaIds.includes(area.id)
                  ),
                  goals: (props.spotter.goals || []).filter(goal =>
                    poke.goalIds.includes(goal.id)
                  )
                }))}
              />
            </ul>
          ) : (
            <p className="no-user-note">ユーザーはいません</p>
          )}
        </div>
      </Wrapper>

      <MeetUpModal />
    </>
  );
}
export default observer(MypageTemplate);

const Wrapper = styled.div`
  min-height: calc(100vh - 44px);
  background-color: ${COLORS.lightGray};
  color: #444;

  .header {
    position: relative;
    background-color: #fff;

    .bg {
      width: 100%;
      height: 125px;
      margin-bottom: 44px;
    }

    .icon {
      height: 88px;
      width: 88px;
      border-radius: 50%;
      border: 2px solid #fff;
      position: absolute;
      top: 80px;
      left: 16px;
    }

    .profile-nav {
      padding: 0 16px;

      .top {
        display: flex;
        align-items: center;

        .name {
          font-size: 18px;
          margin-right: 4px;
        }

        * {
          margin-right: 2px;
          color: inherit;
        }

        a {
          height: 24px;
          width: 24px;
        }

        svg {
          cursor: pointer;
        }
      }

      .bottom {
        font-size: 14px;
        margin-top: 4px;
        color: #666;

        a {
          font-size: 12px;
          color: inherit;
          text-decoration: none;
          border: 1px solid #aaa;
          padding: 2px 6px;
          margin-left: 4px;
          border-radius: 999px;
        }
      }
    }

    .app-nav {
      display: table;
      width: 100%;
      padding: 0 16px 12px;
      margin: 28px 0 0;

      .app-nav-item {
        position: relative;
        display: table-cell;
        text-align: center;
        width: 50%;

        &:first-of-type {
          &::before {
            content: "";
            position: absolute;
            top: 10%;
            right: 0;
            width: 1px;
            height: 80%;
            background-color: #ccc;
          }
        }

        .num {
          font-size: 18px;
          font-weight: 800;
        }
      }
    }
  }

  .content {
    h2 {
      padding: 16px 16px 8px;
      font-size: 16px;
    }

    .user-list {
      padding: 4px 16px 8px;
    }

    .no-user-note {
      text-align: center;
      font-size: 14px;
      color: #888;
      margin-top: 16px;
    }
  }
`;
