import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ClassIcon from '@mui/icons-material/Class';
import Button from '@mui/material/Button';
import FlatList from 'flatlist-react';

interface Class {
  id: number;
  title: string;
  subtitle: string;
}

export function Classes() {
  const navigate = useNavigate();

  const [classes] = useState<Class[]>([
    {
      id: 0,
      title: 'IHC - Sala LE1',
      subtitle: 'Professora Vania',
    },
    {
      id: 1,
      title: 'PSD - Sala LE2',
      subtitle: 'Professora Vania',
    },
    {
      id: 2,
      title: 'Controle 2 - Sala LE3',
      subtitle: 'Professora Vania',
    },
  ]);

  return (
    <div
      style={{ display: 'flex', flex: 1, flexDirection: 'row', padding: 16 }}
    >
      <div style={{ maxWidth: '55%' }}>
        <Typography variant="h3">Informações sobre as aulas</Typography>
        <Typography variant="subtitle1">
          Confira quais aulas estão acontecendo no DC agora
        </Typography>

        <FlatList
          list={classes}
          renderItem={({ title, subtitle }) => (
            <Card
              style={{
                margin: '8px 0px',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 8,
              }}
            >
              <CardContent
                style={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center' }}
              >
                <ClassIcon />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" component="div">
                    {title}
                  </Typography>

                  <Typography variant="body2">{subtitle}</Typography>
                </div>
              </CardContent>
            </Card>
          )}
          style={{ flex: 1, marginTop: 16 }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Button
          variant="contained"
          style={{ width: 400, height: 64, fontSize: 24 }}
          onClick={() => navigate('/')}
        >
          Voltar a tela inicial
        </Button>
        <Button
          variant="contained"
          style={{ width: 400, height: 64, fontSize: 24 }}
          onClick={() => navigate('/facial-recognition')}
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
    </div>
  );
}
