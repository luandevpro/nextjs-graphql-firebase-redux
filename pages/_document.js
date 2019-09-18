import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />)),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <noscript id="jss-insertion-point" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="icon" type="png" sizes="192x192" href="/static/icon/icon-192x192.png" />
          <link
            rel="apple-touch-icon"
            type="png"
            sizes="192x192"
            href="/static/icon/icon-192x192.png"
          />
          <link rel="icon" type="png" sizes="512x512" href="/static/icon/icon-512x512.png" />
          <link
            rel="apple-touch-icon"
            type="png"
            sizes="512x512"
            href="/static/icon/icon-512x512.png"
          />

          <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />

          <meta name="theme-color" content="#fff" />

          <link rel="stylesheet" href="/static/css/nprogress.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
