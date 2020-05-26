export interface IUser {
  userId: number;
  name: string;
  twitterId: string;
  icon: string;
  banner: string;
  follower: number;
  areas: Array<{ id: number; name: string }>;
  goals: Array<{ id: number; name: string }>;
}

export type Categories = "areas" | "goals";

export type Area = {
  id: string;
  name: string;
};

export type Goal = {
  id: string;
  name: string;
};

export type PokeData = {
  pokeId: string;
  userId: string;
  bannerUrl: string;
  name: string;
  iconUrl: string;
  twitterId: string;
  twitterFollowerCount: number;
  idNumStr: string;
  areaIds: string[];
  goalIds: string[];
  meet: boolean;
  follow: boolean;
};
