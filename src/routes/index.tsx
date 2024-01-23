import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Classes } from '../pages/Classes';
import { FacialRecognition } from '../pages/FacialRecognition';
import { About } from '../pages/About';
import { Chat } from '../pages/Chat';

export type AppNativeStackNavigatorProps = {
  Home: undefined;
  Classes: undefined;
  FacialRecognition: undefined;
  About: undefined;
  Chat: undefined;
};

export default () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/classes" element={<Classes />} />
    <Route path="/facial-recognition" element={<FacialRecognition />} />
    <Route path="/about" element={<About />} />
    <Route path="/chat" element={<Chat />} />
  </Routes>
);
