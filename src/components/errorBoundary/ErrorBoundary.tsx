import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import styles from './ErrorBoundary.module.scss';

interface IErrorBoundaryProps extends WithTranslation {
  children?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return !this.props.tReady ? (
        <p>Loading..</p> //заменить на loader
      ) : (
        <p className={styles.message}>
          {t('message')}
          <br />
          <Link className={styles.link} to="/">
            {t('link')}
          </Link>
          {t('advice')}
        </p>
      );
    }

    return this.props.children;
  }
}

export default withTranslation('error-boundary')(ErrorBoundary);
