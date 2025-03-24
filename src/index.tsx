import {
  type RenderItemFormSidebarPanelCtx,
  type RenderModalCtx,
  connect,
} from 'datocms-plugin-sdk';
import { render } from './utils/render';
import ConfigScreen from './entrypoints/ConfigScreen';
import 'datocms-react-ui/styles.css';
import CrowdinSidebar from './entrypoints/CrowdinSidebar';
import DeletionConfirmationModal from './entrypoints/DeletionConfirmationModal';

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  renderModal(modalId: string, ctx: RenderModalCtx) {
    switch (modalId) {
      case 'deletionConfirmation':
        return render(<DeletionConfirmationModal ctx={ctx} />);
    }
  },
  itemFormSidebarPanels() {
    return [
      {
        id: 'crowdin',
        label: 'Crowdin',
        startOpen: true,
        placement: ['before', 'links'],
      },
    ];
  },
  renderItemFormSidebarPanel(
    sidebarPanelId: string,
    ctx: RenderItemFormSidebarPanelCtx
  ) {
    render(<CrowdinSidebar ctx={ctx} />);
  },
});
