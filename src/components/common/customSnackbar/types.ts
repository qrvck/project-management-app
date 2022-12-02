export interface ISnackBarProps {
  isOpen: boolean;
  closeCallback: () => void;
  type: 'error' | 'info' | 'success' | 'warning';
  message: string;
}

export type TSnackBarState = Omit<ISnackBarProps, 'closeCallback'>;
