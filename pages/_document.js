import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet } from 'styled-components';
import getContext from '../lib/context';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="vi">
        <Head>{this.props.styleTags}</Head>
        <Head>{this.props.styleTagsStyled}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ({ renderPage }) => {
  const pageContext = getContext();
  const sheet = new ServerStyleSheets();
  const sheetStyled = new ServerStyleSheet();
  const page = renderPage((App) => (props) =>
    sheet.collect(<App pageContext={pageContext} {...props} />),
  );
  const styleTags = sheet.getStyleElement();
  const styleTagsStyled = sheetStyled.getStyleElement();
  return {
    ...page,
    pageContext,
    styleTags,
    styleTagsStyled,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: pageContext.sheetsRegistry.toString(),
        }}
      />
    ),
  };
};
