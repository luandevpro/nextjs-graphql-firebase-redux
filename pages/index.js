import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
import { userByPk } from '../graphql/users/query';
import withLayout from '../lib/withLayout';

const Index = () => {
  const { loading, error, data } = useQuery(userByPk);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div style={{ textAlign: 'center', margin: '100px' }}>
      <h1>{`${data.users[0].displayName}`}</h1>
    </div>
  );
};

export default withLayout(withApollo(Index));

Index.propTypes = {
   user: PropTypes.object, // eslint-disable-line
};
