import * as React from "react";
import { observer } from "mobx-react";

import PrivacyPolicyTemplate from "../components/template/PrivacyPolicy";
import HeaderSimple from "../components/HeaderSimple";

@observer
export default class PrivacyPolicy extends React.Component<{}> {
  public render() {
    return (
      <>
        <HeaderSimple title="プライバシーポリシー" />
        <PrivacyPolicyTemplate />
      </>
    );
  }
}
