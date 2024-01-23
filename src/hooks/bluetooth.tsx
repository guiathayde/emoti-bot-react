import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

interface BluetoothDeviceProps {
  device: BluetoothDevice;
}

interface BluetoothContextData {
  devices: BluetoothDeviceProps[];
  connectedDevice: BluetoothDevice | null;
  listBluetoothDevices: () => Promise<void>;
  connectToDevice: (device: BluetoothDevice) => Promise<void>;
  sendDataToDevice: (data: ArrayBuffer) => Promise<void>;
}

const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData
);

interface BluetoothProviderProps {
  children: ReactNode;
}

export function BluetoothProvider({ children }: BluetoothProviderProps) {
  const [devices, setDevices] = useState<BluetoothDeviceProps[]>([]);
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [serviceUUID, setServiceUUID] = useState('');
  const [characteristicUUID, setCharacteristicUUID] = useState('');

  const listBluetoothDevices = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });

      setDevices((prevDevices) => [...prevDevices, { device }]);
    } catch (error) {
      console.error('Erro ao listar dispositivos Bluetooth:', error);
    }
  };

  const connectToDevice = async (device: BluetoothDevice) => {
    if (!device.gatt) {
      console.error('GATT não disponível');
      return;
    }

    try {
      const server = await device.gatt.connect();
      const services = await server.getPrimaryServices();

      for (const service of services) {
        console.log(`Serviço: ${service.uuid}`);

        const characteristics = await service.getCharacteristics();
        for (const characteristic of characteristics) {
          console.log(`Característica: ${characteristic.uuid}`);
        }
      }

      const characteristics = await services[0].getCharacteristics();

      setServiceUUID(services[0].uuid);
      setCharacteristicUUID(characteristics[0].uuid);

      console.log('Conectado ao dispositivo:', device);
      setConnectedDevice(device);
    } catch (error) {
      console.error('Erro ao conectar ao dispositivo:', error);
    }
  };

  const sendDataToDevice = useCallback(
    async (data: ArrayBuffer) => {
      if (
        connectedDevice &&
        connectedDevice.gatt &&
        !connectedDevice.gatt?.connected
      ) {
        console.error('Nenhum dispositivo conectado');
        return;
      }

      try {
        const service = await connectedDevice?.gatt?.getPrimaryService(
          serviceUUID
        );
        const characteristic = await service?.getCharacteristic(
          characteristicUUID
        );

        await characteristic?.writeValue(data);
        console.log('Dados enviados com sucesso');
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    },
    [characteristicUUID, connectedDevice, serviceUUID]
  );

  return (
    <BluetoothContext.Provider
      value={{
        devices,
        connectedDevice,
        listBluetoothDevices,
        connectToDevice,
        sendDataToDevice,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
}

export function useBluetooth(): BluetoothContextData {
  const context = useContext(BluetoothContext);

  if (!context) {
    throw new Error('useBluetooth must be used within an BluetoothProvider');
  }

  return context;
}
