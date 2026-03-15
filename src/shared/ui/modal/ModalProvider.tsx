import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useAppContext } from '../../../app/state/AppContext';
import { createLogger } from '../../lib/logger';
import { AppModal, type AppModalAction } from './AppModal';
import type { AppIconSpec } from '../AppIcon';

const logger = createLogger('ui:modal');

type PresentModalParams = {
  title: string;
  description?: string;
  icon?: AppIconSpec;
  dismissible?: boolean;
  actions: AppModalAction[];
};

type ConfirmModalParams = {
  title: string;
  description?: string;
  icon?: AppIconSpec;
  confirmLabel: string;
  cancelLabel: string;
  confirmVariant?: 'primary' | 'secondary' | 'soft';
  onConfirm: () => void;
};

type ModalContextValue = {
  present: (params: PresentModalParams) => void;
  confirm: (params: ConfirmModalParams) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: React.PropsWithChildren) {
  const { theme } = useAppContext();
  const [modal, setModal] = useState<PresentModalParams | null>(null);

  const close = useCallback(() => {
    logger.debug('Closing modal');
    setModal(null);
  }, []);

  const present = useCallback((params: PresentModalParams) => {
    logger.info('Presenting modal', { title: params.title });
    setModal(params);
  }, []);

  const confirm = useCallback((params: ConfirmModalParams) => {
    logger.info('Presenting confirm modal', { title: params.title });
    setModal({
      title: params.title,
      description: params.description,
      icon: params.icon,
      dismissible: true,
      actions: [
        {
          key: 'cancel',
          label: params.cancelLabel,
          variant: 'secondary',
          icon: { name: 'xmark', tone: 'muted' },
          onPress: close,
        },
        {
          key: 'confirm',
          label: params.confirmLabel,
          variant: params.confirmVariant ?? 'primary',
          icon: { name: 'check', tone: 'primary' },
          onPress: () => {
            close();
            params.onConfirm();
          },
        },
      ],
    });
  }, [close]);

  const value = useMemo<ModalContextValue>(
    () => ({ present, confirm, close }),
    [present, confirm, close],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AppModal
        visible={Boolean(modal)}
        theme={theme}
        title={modal?.title ?? ''}
        description={modal?.description}
        icon={modal?.icon}
        dismissible={modal?.dismissible}
        onClose={close}
        actions={modal?.actions}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used inside ModalProvider');
  }

  return context;
}
