import { ReactElement } from "react";
import { action, observable } from "mobx";

type Variant = "success" | "error"; // | "warning" | "info";

export class NotifierStore {
  // observable
  @observable
  isOpened: boolean = false;

  @observable
  message: string | ReactElement<any> = "";

  @observable
  variant: Variant = "success";

  // action
  @action
  open = ({
    message,
    variant
  }: {
    message: string | ReactElement<any>;
    variant?: Variant;
  }) => {
    this.isOpened = true;
    this.variant = variant || "success";
    this.message = message;
  };

  @action
  close = () => {
    this.isOpened = false;
  };
}
