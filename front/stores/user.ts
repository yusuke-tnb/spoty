import { action, observable, computed, when } from "mobx";
import api from "../services/api";

export class UserStore {
  constructor() {
    when(
      () => this.isLoggedin,
      async () => {
        api.getUser({ userId: this.userId }).then(res => {
          if (!this.firebaseUid) return;
          this.setData({
            firebaseUid: this.firebaseUid,
            bannerUrl: res.bannerUrl,
            name: res.name,
            iconUrl: res.iconUrl,
            twitterId: res.twitterId,
            userId: res.userId,
            pokeCount: res.pokeCount,
            spotCount: res.spotCount,
            email: res.email,
            lastCheckPokeTime: res.lastCheckPokeTime,
            lastPokedTime: res.lastPokedTime
          });
        });
      }
    );
  }

  @observable
  isLoading: boolean = true;
  @observable
  userId?: string = undefined;
  @observable
  firebaseUid?: string = undefined;
  @observable
  name?: string = undefined;
  @observable
  iconUrl?: string = undefined;
  @observable
  bannerUrl?: string = undefined;
  @observable
  twitterId?: string = undefined;
  @observable
  pokeCount?: number = undefined;
  @observable
  spotCount?: number = undefined;
  @observable
  email?: string = undefined;
  @observable
  lastCheckPokeTime?: number = undefined;
  @observable
  lastPokedTime?: number = undefined;

  @computed
  get isLoggedin() {
    return !!this.firebaseUid;
  }

  @action
  setData = ({
    userId,
    firebaseUid,
    name,
    iconUrl,
    bannerUrl,
    twitterId,
    pokeCount,
    spotCount,
    email,
    lastCheckPokeTime,
    lastPokedTime
  }: {
    userId?: string;
    firebaseUid?: string;
    name?: string;
    iconUrl?: string;
    bannerUrl?: string;
    twitterId?: string;
    pokeCount?: number;
    spotCount?: number;
    email?: string;
    lastCheckPokeTime?: number;
    lastPokedTime?: number;
  }) => {
    userId && (this.userId = userId);
    firebaseUid && (this.firebaseUid = firebaseUid);
    name && (this.name = name);
    iconUrl && (this.iconUrl = iconUrl);
    bannerUrl && (this.bannerUrl = bannerUrl);
    twitterId && (this.twitterId = twitterId);
    (pokeCount || pokeCount === 0) && (this.pokeCount = pokeCount);
    (spotCount || spotCount === 0) && (this.spotCount = spotCount);
    email && (this.email = email);
    lastCheckPokeTime && (this.lastCheckPokeTime = lastCheckPokeTime);
    lastPokedTime && (this.lastPokedTime = lastPokedTime);
  };

  @action
  logout = () => {
    this.userId = undefined;
    this.firebaseUid = undefined;
    this.name = undefined;
    this.iconUrl = undefined;
    this.bannerUrl = undefined;
    this.twitterId = undefined;
    this.pokeCount = undefined;
    this.spotCount = undefined;
    this.email = undefined;
  };

  @action
  setLoading = isLoading => {
    this.isLoading = isLoading;
  };
}
