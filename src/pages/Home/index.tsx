import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Bluetooth, BluetoothDisabled, MoreVert } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from 'react-modal';

import { useBluetooth } from '../../hooks/bluetooth';

import AppIcon from '../../assets/app_icon.png';

export function Home() {
  const { connectToDevice, connectedDevice } = useBluetooth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isBluetoothModalVisible, setIsBluetoothModalVisible] = useState(false);

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
        {connectedDevice !== null ? (
          <Bluetooth htmlColor="#6750A4" fontSize="large" />
        ) : (
          <BluetoothDisabled htmlColor="#c30010" style={{ fontSize: 64 }} />
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 32,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVert style={{ fontSize: 64 }} />
        </Button>
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
          <MenuItem
            onClick={async () => {
              handleClose();
              setIsBluetoothModalVisible(true);

              await connectToDevice();
            }}
          >
            Configurar Bluetooth
          </MenuItem>
        </Menu>
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

      <Modal
        isOpen={isBluetoothModalVisible}
        onRequestClose={() => setIsBluetoothModalVisible(false)}
        ariaHideApp={false}
        style={{
          content: {
            top: '128px',
            left: '128px',
            right: '128px',
            bottom: '128px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <div
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress
            style={{ color: '#6750A4', marginTop: 128 }}
            size={64}
          />
        </div>
      </Modal>
    </div>
  );
}
