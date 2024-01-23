import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

interface BluetoothContextData {
  connectedDevice: BluetoothDevice | null;
  connectToDevice: () => Promise<void>;
  sendDataToDevice: (data: ArrayBuffer) => Promise<void>;
}

const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData
);

interface BluetoothProviderProps {
  children: ReactNode;
}

export function BluetoothProvider({ children }: BluetoothProviderProps) {
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [serviceUUID, setServiceUUID] = useState('');
  const [characteristicUUID, setCharacteristicUUID] = useState('');

  const connectToDevice = async () => {
    try {
      const devices = await navigator.bluetooth.getDevices();
      console.log('Dispositivos pareados:', devices);

      for (const device of devices) {
        if (device.name === 'HEAD') {
          setConnectedDevice(device);

          const signal = new AbortController();
          device
            .watchAdvertisements({ signal: signal.signal })
            .catch((error) => {
              console.log(`watch advertisements error:`, error);
            });

          const result = await Promise.race([
            new Promise((resolve) => {
              device.onadvertisementreceived = (event) => {
                console.log(`advertisement received:`, event);
                resolve(event);
              };
            }),
            new Promise((resolve) => {
              setTimeout(() => {
                resolve('timeout');
              }, 4000);
            }),
          ]);
          console.log(`received advertisement:`, result);

          signal.abort();

          if (device.gatt) {
            const server = await device.gatt.connect();

            const services = await server.getPrimaryServices();

            const serviceUUID = services[0].uuid;
            console.log(`Serviço: ${serviceUUID}`);
            setServiceUUID(serviceUUID);

            const characteristics = await services[0].getCharacteristics();
            const characteristicUUID = characteristics[0].uuid;
            console.log(`Característica: ${characteristicUUID}`);
            setCharacteristicUUID(characteristicUUID);

            console.log('Listagem de serviços e características:');
            for (const service of services) {
              console.log(`Serviço: ${service.uuid}`);

              const characteristics = await service.getCharacteristics();
              for (const characteristic of characteristics) {
                console.log(`Característica: ${characteristic.uuid}`);
              }

              console.log('\n\n');
            }
          }
        }
      }
    } catch (error) {
      console.error('Erro ao listar dispositivos Bluetooth:', error);
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
        connectedDevice,
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
