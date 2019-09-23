import styled from 'styled-components';
import { ListItem } from '@material-ui/core';

export const ListItemStyled = styled(ListItem)`
  && {
    color: ${(props) => props.facebook && props.theme.palette.primary.contrastText};
    background: ${(props) => props.facebook && props.theme.palette.primary.main};
    border: 0;
    height: 48px;
    padding: 0 30px;
    border-radius: 2px;
    :hover {
      background: ${(props) => props.facebook && props.theme.palette.primary.dark};
    }
  }
`;
