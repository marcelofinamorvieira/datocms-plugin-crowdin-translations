import { RenderModalCtx } from 'datocms-plugin-sdk';
import { Button, Canvas } from 'datocms-react-ui';
import s from './styles.module.css';

type PropTypes = {
  ctx: RenderModalCtx;
};

const DeletionConfirmationModal = ({ ctx }: PropTypes) => {
  return (
    <Canvas ctx={ctx}>
      <div className={s.modalButtonContainer}>
        <Button
          onClick={() => {
            ctx.resolve(true);
          }}
          buttonType="negative"
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            ctx.resolve(false);
          }}
          buttonType="primary"
        >
          Cancel
        </Button>
      </div>
    </Canvas>
  );
};

export default DeletionConfirmationModal;
