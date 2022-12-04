export interface ISnackBarProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'error' | 'info' | 'success' | 'warning';
  message: string;
}

export type TSnackBarState = Omit<ISnackBarProps, 'onClose'>;
