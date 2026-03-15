import React from 'react';
import { AppContextProvider } from '../state/AppContext';
import { PlayerProvider } from '../../features/player/PlayerProvider';
import { ModalProvider } from '../../shared/ui/modal/ModalProvider';
import { ToastProvider } from '../../shared/ui/toast/ToastProvider';

export function AppProviders({ children }: React.PropsWithChildren) {
  return (
    <AppContextProvider>
      <ToastProvider>
        <PlayerProvider>
          <ModalProvider>{children}</ModalProvider>
        </PlayerProvider>
      </ToastProvider>
    </AppContextProvider>
  );
}
