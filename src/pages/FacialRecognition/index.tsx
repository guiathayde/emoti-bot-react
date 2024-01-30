import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useRobot } from '../../hooks/robot';
import { useFacilaEmotionRecognition } from '../../hooks/facialEmotionRecognition';

import { EXPRESSIONS } from '../../utils/Constants/RobotFace';
import { convertToNumberArray1Byte } from '../../utils/convertToNumberArray1Byte';

import { FaceTracker } from '../../components/FaceTracker';

export function FacialRecognition() {
  const navigate = useNavigate();
  const { getAiSdk, dominantEmotion } = useFacilaEmotionRecognition();
  const { sendData } = useRobot();

  const videoEl = useRef<HTMLVideoElement>(null);

  const [image] = useState<string | null>(null);
  const [isLoading] = useState(true);

  useEffect(() => {
    getAiSdk(videoEl);
  }, [getAiSdk, videoEl]);

  useEffect(() => {
    switch (dominantEmotion) {
      case 'Happy': {
        const data = convertToNumberArray1Byte(EXPRESSIONS.HAPPY);
        for (const byte of data) {
          sendData(byte);
        }
        break;
      }
      case 'Sad': {
        const data = convertToNumberArray1Byte(EXPRESSIONS.SAD);
        for (const byte of data) {
          sendData(byte);
        }
        break;
      }
      case 'Angry': {
        const data = convertToNumberArray1Byte(EXPRESSIONS.ANGRY);
        for (const byte of data) {
          sendData(byte);
        }
        break;
      }
      case 'Surprise': {
        const data = convertToNumberArray1Byte(EXPRESSIONS.SURPRISE);
        for (const byte of data) {
          sendData(byte);
        }
        break;
      }
      case 'Neutral': {
        const data = convertToNumberArray1Byte(EXPRESSIONS.NEUTRAL);
        for (const byte of data) {
          sendData(byte);
        }
        break;
      }
      case 'Disgust': {
        const data = convertToNumberArray1Byte(EXPRESSIONS.DISGUST);
        for (const byte of data) {
          sendData(byte);
        }
        break;
      }
      default:
        break;
    }
  }, [dominantEmotion, sendData]);

  if (isLoading || !image) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {dominantEmotion.length === 0 && (
          <>
            <CircularProgress style={{ color: '#6750A4', fontSize: 128 }} />

            <div
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px 16px',
              }}
            >
              <h3>Identificando emoção...</h3>
            </div>
          </>
        )}

        <div style={{ width: '640px', height: '480px', position: 'relative' }}>
          <video id="videoEl" ref={videoEl}></video>
          <FaceTracker videoEl={videoEl}></FaceTracker>
        </div>

        {dominantEmotion.length > 0 && (
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="subtitle2"
                style={{ display: 'flex', marginTop: 16, fontSize: 32 }}
              >
                Emoção identificada:{'  '}
                {dominantEmotion}
              </Typography>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
              <Button
                variant="contained"
                style={{ width: 200, height: 64, fontSize: 16 }}
                onClick={() => navigate('/')}
              >
                Voltar
              </Button>
              <Button
                variant="contained"
                style={{ width: 200, height: 64, fontSize: 16 }}
                onClick={() => navigate('/chat')}
              >
                Prosseguir ao chat
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
