import React from 'react';
import { AppContextProvider } from '../state/AppContext';

export function AppProviders({ children }: React.PropsWithChildren) {
  return <AppContextProvider>{children}</AppContextProvider>;
}
