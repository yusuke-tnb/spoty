import Link from "next/link";
import styled from "styled-components";

interface IProps {
  login(): void;
}

export default function LandingPageTemplate(props: IProps) {
  return (
    <Wrapper>
      <section className="hero">
        <h1>
          <img src="/static/logo-super-large.svg" />
        </h1>
        <h2>- 今、会える友達が見つかるアプリ -</h2>
        <button onClick={props.login}>
          <img src="/static/twitter.svg" alt="" />
          Twitter で登録/ログイン
        </button>
        <p className="note">
          ※&nbsp;
          <Link href="/privacy-policy">
            <a>プライバシーポリシー</a>
          </Link>
          に同意の上ご利用ください
        </p>
      </section>

      <section className="whatis">
        <h2>spoty ってなに？</h2>
        <p>
          spoty とは暇なときに自分の近くで共通の目的で暇な人を Twitter
          アカウントから探せるアプリです
        </p>
      </section>

      <section className="steps">
        <h2>遊び方の3ステップ</h2>
        <div className="step step1">
          <img src="/static/step-1.jpg" />
          <div>
            <h3>
              Step<span className="num">1</span>
            </h3>
            <p>
              エリアと目的を設定して
              <br />
              spot する
            </p>
          </div>
        </div>
        <div className="step step2">
          <img src="/static/step-2.jpg" />
          <div>
            <h3>
              Step<span className="num">2</span>
            </h3>
            <p>
              spotした条件に合う
              <br />
              アカウントが表示される
              <span className="note">
                （同じ時間・場所・目的で暇な人が表示されます）
              </span>
            </p>
          </div>
        </div>
        <div className="step step3">
          <img src="/static/step-3.jpg" />
          <div>
            <h3>
              Step<span className="num">3</span>
            </h3>
            <p>
              いきなりDMが
              <br />
              恥ずかしかったら
              <br />
              poke してみよう！
            </p>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2>よくある質問</h2>
        <ul>
          <li>
            <div className="question">自分の位置情報が知られちゃうの？</div>
            <div className="answer">
              spoty
              がお客様の位置情報を取得することはないので現在位置を知られることはありません。
            </div>
          </li>
          <li>
            <div className="question">どうやって他のユーザーと連絡するの？</div>
            <div className="answer">
              spoty
              はユーザーが登録した暇情報をまとめて表示するサービスです。連絡はTwitterより行なっていただきます。
            </div>
          </li>
          <li>
            <div className="question">
              予定が変わって暇じゃなくなったらどうするの？
            </div>
            <div className="answer">登録したspotは３時間で消えます。</div>
          </li>
          <li>
            <div className="question">
              Pokeの仕方、twitterへの飛び方がわからない
            </div>
            <div className="answer">
              ユーザー一覧のカードの部分（右側）を押すとPoke、アイコン部分（左側）を押すとTwitterに飛べます。
            </div>
          </li>
        </ul>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #fff;
  color: #444;
  padding-bottom: 16px;

  section {
    &.hero {
      padding: 16px 24px;
      background-color: #5f97c9;
      color: #fff;
      text-align: center;

      h2 {
        font-size: 18px;
        margin-bottom: 1em;
      }

      button {
        background-color: #1da1f2;
        border: 4px solid #fff;
        color: #fff;
        font-size: 16px;
        padding: 4px 12px;
        margin-bottom: 1em;
        width: 80%;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        > img {
          height: 32px;
          width: 32px;
          margin-right: 2px;
        }
      }

      .note {
        font-size: 10px;

        > a {
          color: inherit;
        }
      }
    }

    &.whatis {
      padding: 0 16px;

      h2 {
        font-size: 20px;
        margin-top: 24px;
        margin-bottom: 4px;
      }

      p {
        font-size: 14px;
      }
    }

    &.steps {
      h2 {
        font-size: 20px;
        padding: 0 16px;
        margin-top: 24px;
        margin-bottom: 4px;
      }

      .step {
        color: #fff;
        display: flex;
        padding: 8px 16px;
        font-weight: 600;

        img {
          margin-right: 16px;
          height: 128px;
          width: auto;
        }

        h3 {
          font-size: 18px;

          .num {
            font-size: 24px;
            font-weight: 600;
            padding-left: 2px;
          }
        }

        p {
          font-size: 18px;
          font-weight: 500;
        }

        &.step1 {
          background-color: #2ddffd;
        }
        &.step2 {
          background-color: #7eeebf;

          .note {
            display: block;
            font-size: 12px;
          }
        }
        &.step3 {
          background-color: #cf81af;
        }
      }
    }

    &.faq {
      padding: 0 16px;

      h2 {
        margin-top: 24px;
        font-size: 20px;
        margin-bottom: 0.5em;
      }

      ul {
        padding-left: 24px;
        font-size: 14px;

        li {
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #ccc;

          .question {
            position: relative;

            &::before {
              content: "Q.";
              position: absolute;
              left: -24px;
              margin-top: 2px;
            }
          }

          .answer {
            position: relative;

            &::before {
              content: "A.";
              position: absolute;
              left: -24px;
              margin-top: 2px;
            }
          }
        }
      }
    }
  }
`;
