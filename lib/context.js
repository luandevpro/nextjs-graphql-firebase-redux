import { SheetsRegistry } from 'react-jss';
import { createGenerateClassName } from '@material-ui/styles';
import { theme } from './theme';

function createPageContext() {
  return {
    theme,
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName(),
  };
}

export default function getContext() {
  if (!process.browser) {
    return createPageContext();
  }

  if (!global.INIT_MATERIAL_UI) {
    global.INIT_MATERIAL_UI = createPageContext();
  }

  return global.INIT_MATERIAL_UI;
}
