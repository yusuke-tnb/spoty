import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

declare global {
  interface Window {
    gtag: any;
  }
}

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          {process.env.NODE_ENV === "production" && (
            <>
              {/* Global site tag (gtag.js) - Google Analytics */}
              {/* https://analytics.google.com/analytics/web/#/a127635446w186576449p183531694/admin/tracking/tracking-code/ */}
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-127635446-1"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-127635446-1');`
                }}
              />
            </>
          )}

          {this.props.styleTags}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <style>{`
            * {
              box-sizing: border-box;
              list-style: none;
              margin: 0;
              padding: 0;
              font-family: Avenir, Hiragino Sans, verdana, arial, helvetica, sans-serif;
              font-weight: 300;
            }
            body {
              max-width: 500px;
              margin: 0 auto;
              background-color: #efefef;
            }
            h1, h2, h3, h4, h5, h6 {
              font-weight: 600;
              letter-spacing: 0.05em;
            }
            input, textarea {
              font-size: 16px;
            }
            input:focus, button:focus, textarea:focus {
              outline: 0;
            }
            button {
              border: 0;
              cursor: pointer;
              background-color: transparent;
            }
          `}</style>
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </html>
    );
  }
}
