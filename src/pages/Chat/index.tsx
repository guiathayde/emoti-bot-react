import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { BotButtonMessage } from './styles';

interface Message {
  id: number;
  message: string;
  option?: string;
  from: 'user' | 'bot';
  type: 'text' | 'button';
}

export function Chat() {
  const navigate = useNavigate();

  const [messages] = useState<Message[]>([
    {
      id: 0,
      message: 'Selecione uma opção para continuarmos com nossa conversa:',
      from: 'bot',
      type: 'text',
    },
    {
      id: 1,
      message: 'Gostaria de conversar sobre',
      option: 'Ansiedade',
      from: 'bot',
      type: 'button',
    },
    {
      id: 2,
      message: 'Gostaria de conversar sobre',
      option: 'Nervosismo',
      from: 'bot',
      type: 'button',
    },
  ]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '16px 24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <Button
          variant="contained"
          style={{ width: 400, height: 64, fontSize: 24 }}
          onClick={() => navigate('/facial-recognition')}
        >
          Reconhecimento facial
        </Button>
        <Button
          variant="contained"
          style={{ width: 400, height: 64, fontSize: 24 }}
          onClick={() => navigate('/')}
        >
          Voltar a tela inicial
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          overflow: 'auto',
          marginTop: 24,
        }}
      >
        {messages.map((message, index) => {
          let previousMessage: Message | null = null;
          if (index > 0) {
            previousMessage = messages[index - 1];
          }

          if (message.from === 'bot') {
            if (message.type === 'button') {
              return (
                <BotButtonMessage
                  style={{
                    maxWidth: '65%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    padding: '8px 16px',
                    backgroundColor: '#6750A4',
                    borderRadius: 12,
                    marginTop:
                      previousMessage && previousMessage.from === 'bot'
                        ? 8
                        : 16,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ color: 'white', fontSize: 32 }}>
                    {message.message} {message.option}
                  </span>
                </BotButtonMessage>
              );
            }

            return (
              <div
                style={{
                  maxWidth: '65%',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: '8px 16px',
                  backgroundColor: '#6750A4',
                  borderRadius: 12,
                  marginTop:
                    previousMessage && previousMessage.from === 'bot' ? 8 : 16,
                }}
              >
                <span style={{ color: 'white', fontSize: 32 }}>
                  {message.message}
                </span>
              </div>
            );
          }

          return (
            <div
              style={{
                maxWidth: '65%',
                flexDirection: 'row',
                alignItems: 'flex-end',
                padding: '8px 16px',
                backgroundColor: '#FEF7FF',
                borderRadius: 12,
                marginTop:
                  previousMessage && previousMessage.from === 'user' ? 8 : 16,
              }}
            >
              <span style={{ color: 'black', fontSize: 32 }}>
                {message.message}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
