import { ReactNode } from 'react';

import { FacilaEmotionRecognitionProvider } from './facialEmotionRecognition';
import { BluetoothProvider } from './bluetooth';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <FacilaEmotionRecognitionProvider>
      <BluetoothProvider>{children}</BluetoothProvider>
    </FacilaEmotionRecognitionProvider>
  );
}
