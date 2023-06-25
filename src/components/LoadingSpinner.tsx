import { Spinner } from 'datocms-react-ui';

type PropTypes = {
  isLoading: boolean;
};

const LoadingSpinner = ({ isLoading }: PropTypes) => {
  return (
    <>
      {isLoading && (
        <div style={{ height: '100px', position: 'relative' }}>
          <Spinner size={48} placement="centered" />
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
