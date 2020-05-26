import * as React from "react";
import { inject, observer } from "mobx-react";

import { ModalsStore } from "../stores/modals";
import { UserStore } from "../stores/user";
import { SpotterStore } from "../stores/spotter";

import MypageTemplate from "../components/template/Mypage";
import HeaderSimple from "../components/HeaderSimple";

import api from "../services/api";

import { PokeData } from "../models";

interface IProps {
  modals: ModalsStore;
  user: UserStore;
  spotter: SpotterStore;
}

interface IState {
  pokeList: PokeData[];
}

@inject("modals", "user", "spotter")
@observer
export default class Mypage extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      pokeList: []
    };
  }

  async componentDidMount() {
    const { pokeList } = await api.getPokeList();
    this.setState({ pokeList });

    if (!this.props.spotter.areas || !this.props.spotter.goals) {
      const [areas, goals] = await Promise.all([
        api.getAreas(),
        api.getGoals()
      ]);
      this.props.spotter.setItems(areas, goals);
    }

    // poke 一覧を確認した時点で lastCheckPokeTime を更新する
    api.updateCheckPokeTime({ lastCheckPokeTime: new Date().getTime() });
    this.props.user.setData({ lastCheckPokeTime: new Date().getTime() });
  }

  public render() {
    return (
      <>
        <HeaderSimple title="マイページ" />
        <MypageTemplate
          modals={this.props.modals}
          user={this.props.user}
          spotter={this.props.spotter}
          pokeList={this.state.pokeList}
        />
      </>
    );
  }
}
