import { ItemsSidebarModal } from '../sheets/items-sidebar-modal.mjs';

const ITEMS_SIDEBAR_CONTROL_SELECTOR = '.ui-control.plain.icon.fa-solid.fa-suitcase';

export function registerSidebarItemsModalHook() {
  document.addEventListener(
    'click',
    (event) => {
      const control = event.target?.closest?.(ITEMS_SIDEBAR_CONTROL_SELECTOR);
      if (!control) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      ItemsSidebarModal.show();
    },
    true
  );
}
