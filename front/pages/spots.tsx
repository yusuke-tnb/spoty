import * as React from "react";
import { inject, observer } from "mobx-react";
import Router, { withRouter } from "next/router";

import SpotsTemplate from "../components/template/Spots";
import Layout from "../components/Layout";
import PokeModal from "../components/PokeModal";
import NoSpotUsersModal from "../components/NoSpotUsersModal";
import TweetModal from "../components/TweetModal";

import { UserStore } from "../stores/user";
import { ModalsStore } from "../stores/modals";
import { SpotterStore } from "../stores/spotter";

interface IProps {
  router: typeof Router;
  user: UserStore;
  modals: ModalsStore;
  spotter: SpotterStore;
}

@inject("user", "modals", "spotter")
@observer
class Spots extends React.Component<IProps> {
  async componentDidMount() {
    // このページでリロードした場合、spot list は取ってくる必要がある
    if (!this.props.spotter.spotUserList) {
      this.props.spotter.getSpotList();
    }
  }

  openPokeModal = targetUser => {
    this.props.modals.open("pokeModal");
    this.props.modals.setModalData("pokeModal", { targetUser });
  };

  openTweetModal = () => {
    this.props.modals.open("tweetModal");
  };

  public render() {
    return (
      <>
        <Layout user={this.props.user}>
          <SpotsTemplate
            spotter={this.props.spotter}
            users={this.props.spotter.spotUserList || []}
            openPokeModal={this.openPokeModal}
          />
        </Layout>

        <PokeModal />
        <NoSpotUsersModal />
        <TweetModal />
      </>
    );
  }
}

export default withRouter(Spots);
