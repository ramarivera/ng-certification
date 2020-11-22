export interface DialogConfig {
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  backdropClass?: string | string[];
}

export const DEFAULT_CONFIG: DialogConfig = {
  hasBackdrop: true,
  backdropClass: ['modal', 'fade', 'in', 'rar-dialog-backdrop'],
  panelClass: 'rar-dialog-panel',
};
