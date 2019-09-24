// lib/withLayout.js
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NProgress from 'nprogress';
import Router from 'next/router';
import Navbar from '../components/Navbar';
import getContext from './context';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function withLayout(BaseComponent) {
  class App extends React.Component {
    constructor(props) {
      super(props);
      const { pageContext } = this.props;
      this.pageContext = pageContext || getContext();
    }

    static async getInitialProps() {
      console.log('ok');
      return { data: '' };
    }

    componentDidMount() {
      const jssStyles = document.querySelector('#jss-server-side');

      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }

      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/service-worker.js', { scope: '/' })
            .then(() => {
               console.log('runing service-worker'); // eslint-disable-line
            })
            .catch((registrationError) => {
               console.log('SW registration failed: ', registrationError); // eslint-disable-line
            });
        });
      }
    }

    render() {
      return (
        <ThemeProvider theme={this.pageContext.theme}>
          <CssBaseline />
          <div>
            <Navbar {...this.props} />
            <BaseComponent {...this.props} />
          </div>
        </ThemeProvider>
      );
    }
  }

  App.getInitialProps = (ctx) => {
    if (BaseComponent.getInitialProps) {
      return BaseComponent.getInitialProps(ctx);
    }
    return {};
  };

  App.propTypes = {
    pageContext: PropTypes.object, // eslint-disable-line
  };

  App.defaultProps = {
    pageContext: null,
  };

  return App;
}

export default withLayout;
