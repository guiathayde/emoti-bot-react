import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { robotApi } from '../services/robotApi';

interface RobotContextData {
  isRobotApiAvailable: boolean;
  sendData: (data: number) => void;
}

const RobotContext = createContext<RobotContextData>({} as RobotContextData);

interface RobotProviderProps {
  children: ReactNode;
}

export function RobotProvider({ children }: RobotProviderProps) {
  const [isRobotApiAvailable, setIsRobotApiAvailable] = useState(false);

  const sendData = useCallback(async (data: number) => {
    return await robotApi.get(`/led/changeExpression/${data}`);
  }, []);

  useEffect(() => {
    robotApi
      .get('/led/getExpressionList')
      .then((response) => {
        console.log(response.data);
        setIsRobotApiAvailable(response.status === 200);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <RobotContext.Provider value={{ isRobotApiAvailable, sendData }}>
      {children}
    </RobotContext.Provider>
  );
}

export function useRobot(): RobotContextData {
  const context = useContext(RobotContext);

  if (!context) {
    throw new Error('useRobot must be used within an RobotProvider');
  }

  return context;
}
