// lib/withLayout.js
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../src/components/Navbar';
import { theme } from './theme';

function withLayout(BaseComponent) {
  class App extends React.Component {
    componentDidMount() {
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <Navbar {...this.props} />
            <BaseComponent {...this.props} />
          </div>
        </ThemeProvider>
      );
    }
  }

  App.propTypes = {
    pageContext: PropTypes.object, // eslint-disable-line
  };

  App.defaultProps = {
    pageContext: null,
  };
  App.getInitialProps = (ctx) => {
    if (BaseComponent.getInitialProps) {
      return BaseComponent.getInitialProps(ctx);
    }
    return {};
  };
  return App;
}

export default withLayout;
