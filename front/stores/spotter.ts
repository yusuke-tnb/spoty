import { action, observable, computed } from "mobx";
import Router from "next/router";
import { Area, Goal, Categories } from "../models";
import stores from "./index";
import api from "../services/api";
import { sleep } from "../utils";

const specialGoals: Goal[] = [
  { id: "follow", name: "フォローしている人だけ" },
  { id: "meet", name: "出会い" }
];

export class SpotterStore {
  // observable
  @observable
  isActive: boolean = false;

  @observable
  selectedCategory: Categories = "areas";

  @observable
  areas: Area[] | null = null;

  @observable
  goals: Goal[] | null = null;

  @observable
  selectedItemIds: { [P in Categories]: string[] } = { areas: [], goals: [] };

  @observable
  spotUserList: any[] | null = null;

  // computed
  @computed
  get selectedCategoryItems(): (Area | Goal)[] {
    switch (this.selectedCategory) {
      case "areas":
        return this.areas || [];
      case "goals": {
        if (!this.goals) return [];
        if (this.selectedItemIds.goals.includes("follow")) {
          return this.goals.filter(g => g.id !== "meet");
        }
        if (this.selectedItemIds.goals.includes("meet")) {
          return this.goals.filter(g => g.id !== "follow");
        }
        return this.goals;
      }
      default:
        return [];
    }
  }

  @computed
  get isSpecialGoalSelected() {
    return specialGoals.some(goal =>
      this.selectedItemIds.goals.includes(goal.id)
    );
  }

  // action
  @action
  setItems = (areas: Area[], goals: Goal[]) => {
    this.areas = areas;
    this.goals = [...goals, ...specialGoals];
  };

  @action
  toggle = () => {
    this.isActive = !this.isActive;
  };

  @action
  switchCategory = (category: Categories) => {
    this.selectedCategory = category;
  };

  @action
  selectItem = (item: Area | Goal) => {
    // specialGoals のいずれかを既に選択していた場合、それ以上 specialGoals は選択できないようにする
    if (
      this.selectedCategory === "goals" &&
      specialGoals.map(goal => goal.id).includes(item.id) &&
      this.isSpecialGoalSelected
    ) {
      return;
    }

    const ids = [...this.selectedItemIds[this.selectedCategory]];
    if (!ids.includes(item.id)) {
      ids.push(item.id);
      this.selectedItemIds[this.selectedCategory] = ids;
    }
  };

  @action
  deselectItem = (item: Area | Goal) => {
    const ids = [...this.selectedItemIds[this.selectedCategory]];

    if (ids.includes(item.id)) {
      ids.splice(ids.indexOf(item.id), 1);
      this.selectedItemIds[this.selectedCategory] = ids;
    }
  };

  @action
  deselectAllItems = () => {
    this.selectedItemIds = { areas: [], goals: [] };
  };

  @action
  spot = async () => {
    // エリアは1つ以上選んでいる必要がある
    const isSpotDisabled = !this.selectedItemIds.areas.length;
    if (isSpotDisabled) {
      stores.notifier.open({
        message: "エリアを選択してください！",
        variant: "error"
      });
      return;
    }

    stores.modals.close("noSpotUsersModal");

    try {
      await api.spot({
        follow: this.selectedItemIds.goals.includes("follow"),
        meet: this.selectedItemIds.goals.includes("meet"),
        areaIds: this.selectedItemIds.areas,
        goalIds: this.selectedItemIds.goals.filter(
          g => !["follow", "meet"].includes(g)
        )
      });
      stores.notifier.open({
        message: "spot できました！条件に合う人を表示します"
      });

      await sleep(1000);

      if (this.isActive) this.toggle();
      Router.push({ pathname: "/spots" });
      await this.getSpotList();

      if (this.spotUserList && this.spotUserList.length) {
        await sleep(1000);
        stores.modals.open("tweetModal");
      } else {
        stores.modals.open("noSpotUsersModal");
      }
    } catch (err) {
      console.error("spot失敗 || getSpotList失敗", err);
    }
  };

  @action
  getSpotList = async () => {
    try {
      const { users } = await api.getSpotList();
      this.spotUserList = users;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}
