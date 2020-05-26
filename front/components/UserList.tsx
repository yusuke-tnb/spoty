import styled from "styled-components";
import { separate, getGoalIcon } from "../utils";
import { IUser } from "../models";

interface IProps {
  open(targetUser: IUser): void;
  users: any[];
}

export default function UserList(props: IProps) {
  return (
    <>
      {props.users.map(user => (
        <ListItemWrapper
          key={user.key}
          onClick={() => props.open(user)}
          bgImgUrl={user.bannerUrl}
        >
          <div className="profile">
            <a
              href={`https://twitter.com/${user.twitterId}`}
              target="_blank"
              onClick={e => e.stopPropagation()}
            >
              <img className="user-icon" src={user.iconUrl} alt="" />
            </a>
            <div className="sub-profile">
              <div className="name">{user.name}</div>
              <div className="follower">
                {separate(user.twitterFollowerCount)}
                &nbsp;フォロワー
              </div>
            </div>
          </div>
          <div className="conditions">
            <div className="areas">
              {user.areas.map(area => (
                <div key={area.id} className="area">
                  {area.name}
                </div>
              ))}
            </div>
            <div className="goals">
              {user.goals.map(goal => {
                const Icon = getGoalIcon(goal.name);
                return (
                  <span key={goal.id} className="icon">
                    {Icon && <Icon />}
                  </span>
                );
              })}
            </div>
          </div>
        </ListItemWrapper>
      ))}
    </>
  );
}

interface IListItemWrapper {
  bgImgUrl: string;
}
const ListItemWrapper = styled.li`
  margin-bottom: 12px;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  background-image: linear-gradient(rgba(0, 0, 0, 0.66), rgba(0, 0, 0, 0.66)),
    url(${(p: IListItemWrapper) => p.bgImgUrl});
  background-position: center;
  background-size: cover;
  cursor: pointer;

  .profile {
    display: flex;
    max-width: 70%;

    .user-icon {
      height: 64px;
      width: 64px;
      border-radius: 9999px;
      margin-right: 8px;
    }

    .sub-profile {
      .name {
        font-size: 16px;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        @media only screen and (min-width: 415px) {
          max-width: 260px;
        }
        @media only screen and (max-width: 414px) {
          max-width: 174px;
        }
        @media only screen and (max-width: 375px) {
          max-width: 133px;
        }
        @media only screen and (max-width: 320px) {
          max-width: 81px;
        }
      }

      .follower {
        font-size: 12px;
      }
    }
  }

  .conditions {
    overflow: hidden;

    .areas {
      font-size: 12px;
      margin-bottom: 8px;

      > .area {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .goals {
      > .icon {
        margin-right: 4px;

        > svg {
          fill: #fff;
          height: 20px;
          width: 20px;
        }
      }
    }
  }
`;
