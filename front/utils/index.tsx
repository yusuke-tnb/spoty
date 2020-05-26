import { Area } from "../models";

export const COLORS = {
  main: "#5F97C9",
  darkBlue: "#4A7ABC",
  yellow: "#ffc94a",
  red: "#FF3939",
  lightGray: "#f5f5f5"
};

import Close from "@material-ui/icons/CloseOutlined";
import Location from "@material-ui/icons/LocationOnOutlined";
import ExpandMore from "@material-ui/icons/ExpandMoreOutlined";
import ChevronLeft from "@material-ui/icons/ChevronLeftOutlined";
import ChevronRight from "@material-ui/icons/ChevronRightOutlined";
import Notifications from "@material-ui/icons/NotificationsOutlined";
import Restaurant from "@material-ui/icons/RestaurantOutlined";
import FavoriteBorder from "@material-ui/icons/FavoriteBorderOutlined";
import LocalDrink from "@material-ui/icons/LocalDrinkOutlined";
import Create from "@material-ui/icons/CreateOutlined";
import SentimentSatisfiedAlt from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import People from "@material-ui/icons/PeopleOutlined";
export const ICONS = {
  Close,
  Location,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  Notifications,
  Restaurant,
  FavoriteBorder,
  LocalDrink,
  Create,
  SentimentSatisfiedAlt,
  People
};

// TODO: goal の name をハードコーディングしない方法にどうにか置き換える
export function getGoalIcon(name) {
  switch (name) {
    case "ご飯":
      return ICONS.Restaurant;
    case "飲み":
      return ICONS.LocalDrink;
    case "もくもく会":
      return ICONS.Create;
    case "暇つぶし":
      return ICONS.SentimentSatisfiedAlt;
    case "フォローしている人だけ":
      return ICONS.People;
    case "出会い":
      return ICONS.FavoriteBorder;
    default:
      return null;
  }
}

/**
 * 数字を3桁ごとにカンマ区切りにする
 */
export function separate(num) {
  // 文字列にする
  num = String(num);

  const len = num.length;

  // 再帰的に呼び出す
  if (len > 3) {
    // 前半を引数に再帰呼び出し + 後半3桁
    return separate(num.substring(0, len - 3)) + "," + num.substring(len - 3);
  } else {
    return num;
  }
}

export function getApiBaseUrl() {
  switch (process.env.NODE_ENV) {
    case "production":
      return "http://54.249.154.26:19091/v1";
    case "development":
      return "http://54.249.154.26:19091/v1";
    default:
      return "http://54.249.154.26:19091/v1";
  }
}

export function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

export function getTwitterShareUrl(areas: Area[]) {
  return `https://twitter.com/share?url=https://spotyapp.jp&text=${areas
    .map(area => area.name)
    .join(
      "・"
    )}エリアでひましてます。%0aひまな人、合流しようよ！%0a&hashtags=spoty,ひますぽ,ひまなう`;
}
