import { action, observable } from "mobx";

export type PontanTypeType =
  | "default"
  | "happy"
  | "wink"
  | "cry"
  | "question"
  | null;
type ModalType = {
  isOpened: boolean;
  pontanType: PontanTypeType;
};
type TargetUser = {
  userId: string;
  name: string;
  icon: string;
  banner: string;
  userTwitterId: string;
  userDisplayName: string;
};

export class ModalsStore {
  @observable
  pokeModal: ModalType & { targetUser: TargetUser | {} } = {
    isOpened: false,
    pontanType: "question",
    targetUser: {}
  };
  @observable
  meetUpModal: ModalType & { targetUser: any | {} } = {
    isOpened: false,
    pontanType: "question",
    targetUser: {}
  };
  @observable
  noSpotUsersModal: ModalType = { isOpened: false, pontanType: "cry" };
  @observable
  tweetModal: ModalType = { isOpened: false, pontanType: "question" };

  @action
  open = (target: string) => {
    // TODO: target の型指定したい
    this[target].isOpened = true;
  };

  @action
  close = (target: string) => {
    this[target].isOpened = false;
  };

  @action
  setModalData = (targetModal: string, payload: object) => {
    this[targetModal] = Object.assign({}, this[targetModal], payload);
  };
}
