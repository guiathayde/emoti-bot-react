import { ReactNode } from 'react';

import { FacilaEmotionRecognitionProvider } from './facialEmotionRecognition';
import { RobotProvider } from './robot';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <FacilaEmotionRecognitionProvider>
      <RobotProvider>{children}</RobotProvider>
    </FacilaEmotionRecognitionProvider>
  );
}
