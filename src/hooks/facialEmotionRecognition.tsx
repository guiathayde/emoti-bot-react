/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useExternalScript } from '../utils/ai-sdk/externalScriptsLoader';
import { getAiSdkControls } from '../utils/ai-sdk/loader';

type DominantEmotion =
  | 'Happy'
  | 'Sad'
  | 'Angry'
  | 'Surprise'
  | 'Neutral'
  | 'Disgust'
  | '';

interface FacilaEmotionRecognitionContextData {
  getAiSdk: (videoEl: RefObject<HTMLVideoElement>) => Promise<void>;
  dominantEmotion: DominantEmotion;
}

const FacilaEmotionRecognitionContext =
  createContext<FacilaEmotionRecognitionContextData>(
    {} as FacilaEmotionRecognitionContextData
  );

interface FacilaEmotionRecognitionProviderProps {
  children: ReactNode;
}

export function FacilaEmotionRecognitionProvider({
  children,
}: FacilaEmotionRecognitionProviderProps) {
  const mphToolsState = useExternalScript(
    'https://sdk.morphcast.com/mphtools/v1.0/mphtools.js'
  );
  const aiSdkState = useExternalScript(
    'https://ai-sdk.morphcast.com/v1.16/ai-sdk.js'
  );

  const [dominantEmotion, setDominantEmotion] = useState<DominantEmotion>('');

  const getAiSdk = useCallback(
    async (videoEl: RefObject<HTMLVideoElement>) => {
      if (
        mphToolsState === 'ready' &&
        aiSdkState === 'ready' &&
        videoEl.current
      ) {
        const { source, start } = await getAiSdkControls();
        await source.useCamera({
          toVideoElement: videoEl.current,
        });
        await start();
      }
    },
    [mphToolsState, aiSdkState]
  );

  function bindEvents() {
    let canExecute = true;

    window.addEventListener('CY_FACE_EMOTION_RESULT', (evt: any) => {
      if (canExecute) {
        console.log(evt.detail.output);
        setDominantEmotion(evt.detail.output.dominantEmotion || '');

        canExecute = false;

        setTimeout(() => {
          canExecute = true;
        }, 3000);
      }
    });
  }

  useEffect(() => {
    bindEvents();
  }, []);

  return (
    <FacilaEmotionRecognitionContext.Provider
      value={{
        getAiSdk,
        dominantEmotion,
      }}
    >
      {children}
    </FacilaEmotionRecognitionContext.Provider>
  );
}

export function useFacilaEmotionRecognition(): FacilaEmotionRecognitionContextData {
  const context = useContext(FacilaEmotionRecognitionContext);

  if (!context) {
    throw new Error(
      'useFacilaEmotionRecognition must be used within an FacilaEmotionRecognitionProvider'
    );
  }

  return context;
}
