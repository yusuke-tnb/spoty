import axios from "axios";
import { getApiBaseUrl } from "../../utils";
import { PokeData } from "../../models";

// type Error = {
//   config: any;
//   request: any;
//   response: {
//     config: any;
//     data: { message: string; data: any | null; error: string };
//     headers: Object;
//     request: XMLHttpRequest;
//     status: number;
//     statusText: string;
//   };
// };

class Api {
  baseUrl;

  constructor() {
    this.baseUrl = getApiBaseUrl();
  }

  getAreas() {
    return this.fetch({
      method: "get",
      url: "/area"
    })
      .then(res => {
        return (
          res.areas.map(area => ({
            id: area.areaId,
            name: area.name
          })) || []
        );
      })
      .catch(err => {
        throw err;
      });
  }

  getGoals() {
    return this.fetch({
      method: "get",
      url: "/goal"
    })
      .then(res => {
        return (
          res.goals.map(goal => ({
            id: goal.goalId,
            name: goal.name
          })) || []
        );
      })
      .catch(err => {
        throw err;
      });
  }

  getUser({
    userId
  }): Promise<{
    bannerUrl: string;
    name: string;
    iconUrl: string;
    twitterId: string;
    userId: string;
    pokeCount: number;
    spotCount: number;
    email: string;
    lastCheckPokeTime: number;
    lastPokedTime: number;
  }> {
    return this.fetch({
      method: "get",
      url: `/user/${userId}`
    })
      .then(res => {
        const user = res.user;
        return {
          bannerUrl: user.banner,
          name: user.displayName,
          iconUrl: user.icon,
          twitterId: user.screenName,
          userId: user.userId,
          pokeCount: user.pokeCount,
          spotCount: user.spotCount,
          email: user.email,
          lastCheckPokeTime: user.lastCheckPokeTime,
          lastPokedTime: user.lastPokedTime
        };
      })
      .catch(err => {
        throw err;
      });
  }

  /**
   * 自分を poke しているユーザーの一覧を取得する
   */
  getPokeList(): Promise<{ pokeList: PokeData[] }> {
    return this.fetch({
      method: "get",
      url: "/poke"
    })
      .then(res => {
        return {
          pokeList: res.pokes.map(poke => ({
            pokeId: poke.pokeId,
            userId: poke.userProfile.userId,
            bannerUrl: poke.userProfile.banner,
            name: poke.userProfile.displayName,
            iconUrl: poke.userProfile.icon,
            twitterId: poke.userProfile.screenName,
            twitterFollowerCount: poke.userProfile.twitterFollowerCount,
            idNumStr: poke.userProfile.idNumStr,
            areaIds: poke.spot.areaIds,
            goalIds: poke.spot.goalIds,
            meet: poke.spot.meet,
            follow: poke.spot.follow
          }))
        };
      })
      .catch(err => {
        if (err.status === 404 && err.message === "no pokes") {
          return { pokeList: [] };
        }
        throw err;
      });
  }

  /**
   * spot しているユーザーの一覧を取得する
   */
  getSpotList(): Promise<{ users: any[] }> {
    return this.fetch({
      method: "get",
      url: "/spot"
    })
      .then(res => {
        const users = res.users.map(user => ({
          bannerUrl: user.banner,
          name: user.displayName,
          iconUrl: user.icon,
          twitterId: user.screenName,
          twitterFollowerCount: user.twitterFollowerCount,
          userId: user.userId,
          pokeCount: user.pokeCount,
          spotCount: user.spotCount,
          areaIds: user.currentSpot.areaIds,
          goalIds: user.currentSpot.goalIds,
          meet: user.currentSpot.meet,
          follow: user.currentSpot.follow
        }));
        return { users };
      })
      .catch(err => {
        if (err.status === 404 && err.message === "no spots") {
          return { users: [] };
        }
        throw err;
      });
  }

  login({
    firebaseUid,
    displayName,
    screenName,
    icon,
    banner,
    accessToken,
    secret,
    idNumStr,
    email
  }: {
    firebaseUid: string;
    displayName?: string;
    screenName?: string;
    icon?: string;
    banner?: string;
    accessToken?: string;
    secret?: string;
    idNumStr?: string;
    email?: string;
  }): Promise<{ jwtToken: string; userId: string }> {
    return this.fetch({
      method: "post",
      url: "/login",
      data: {
        firebaseUid,
        displayName,
        screenName,
        icon,
        banner,
        accessToken,
        secret,
        idNumStr,
        email
      },
      headers: {
        "Content-Type": "application/json" // X-Access-Token は載せたくないので headers を指定して上書き
      }
    })
      .then(res => {
        const token: string = res.token;
        const userId: string = res.userId;
        return { jwtToken: token, userId };
      })
      .catch(err => {
        throw err;
      });
  }

  async spot({
    follow,
    meet,
    areaIds,
    goalIds
  }: {
    follow: boolean;
    meet: boolean;
    areaIds: string[];
    goalIds: string[];
  }) {
    return await this.fetch({
      method: "post",
      url: "/spot",
      data: { follow, meet, areaIds, goalIds }
    })
      .then(() => {
        return;
      })
      .catch(err => {
        throw err;
      });
  }

  /**
   * poke（友だちに「会おうよ」ってやるやつ）する
   */
  poke({ targetId }) {
    return this.fetch({
      method: "post",
      url: "/poke",
      data: { targetId }
    })
      .then(() => {
        return;
      })
      .catch(err => {
        throw err;
      });
  }

  sendInquiry({ content }) {
    return this.fetch({
      method: "post",
      url: "/user/inquiry",
      data: { subject: "subject", text: content }
    })
      .then(() => {
        return;
      })
      .catch(err => {
        throw err;
      });
  }

  updateEmail({ email }) {
    return this.fetch({
      method: "put",
      url: "/user/email",
      data: { email }
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        throw err;
      });
  }

  updateCheckPokeTime({ lastCheckPokeTime }: { lastCheckPokeTime: number }) {
    return this.fetch({
      method: "put",
      url: "/user/checkpoketime",
      data: { lastCheckPokeTime }
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        throw err;
      });
  }

  fetch(config) {
    return axios({
      method: config.method || "get",
      baseURL: this.baseUrl,
      url: config.url,
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.jwtToken
      },
      ...config
    })
      .then(res => {
        return res.data.data;
      })
      .catch(err => {
        if (err.response) {
          throw {
            status: err.response.status,
            message: err.response.data.message,
            data: err.response.data.data
          };
        }
        throw err;
      });
  }
}

export default new Api();
