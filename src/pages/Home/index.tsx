import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { SignalCellularNodata, SignalCellular4Bar } from '@mui/icons-material';

import { useRobot } from '../../hooks/robot';

import AppIcon from '../../assets/app_icon.png';

export function Home() {
  const navigate = useNavigate();
  const { isRobotApiAvailable } = useRobot();

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {isRobotApiAvailable ? (
          <SignalCellular4Bar htmlColor="#46a75d" fontSize="large" />
        ) : (
          <SignalCellularNodata htmlColor="#c30010" style={{ fontSize: 64 }} />
        )}
      </div>

      <img
        style={{ marginBottom: 24, width: 200, height: 200 }}
        src={AppIcon}
      />

      <Button
        variant="contained"
        style={{ width: 400, height: 64, fontSize: 24 }}
        onClick={() => {
          navigate('/classes');
        }}
      >
        Agora no DC
      </Button>
      <Button
        variant="contained"
        style={{ width: 400, height: 64, fontSize: 24 }}
        onClick={() => {
          navigate('/facial-recognition');
        }}
      >
        Reconhecimento Facial
      </Button>
      <Button
        variant="contained"
        style={{ width: 400, height: 64, fontSize: 24 }}
        onClick={() => navigate('/about')}
      >
        Conheça o DC
      </Button>
    </div>
  );
}
