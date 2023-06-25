import { Spinner } from 'datocms-react-ui';

type PropTypes = {
  isLoading: boolean;
  crowdinIsSetup: boolean;
};

const LoadingSpinner = ({ isLoading, crowdinIsSetup }: PropTypes) => {
  return (
    <>
      {!crowdinIsSetup && isLoading && (
        <div style={{ height: '100px', position: 'relative' }}>
          <Spinner size={48} placement="centered" />
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
