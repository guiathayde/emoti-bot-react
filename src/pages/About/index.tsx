import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import AppIcon from '../../assets/app_icon.png';
import LogoUfscar from '../../assets/logo_ufscar.png';
import IHC from '../../assets/ihc.png';
import MentalHealth from '../../assets/mental_health.png';

interface Info {
  id: number;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

const infos: Info[] = [
  {
    id: 0,
    title: 'UFSCar',
    description:
      'A Universidade Federal de São Carlos (UFSCar), estabelecida em 1968, é reconhecida como uma das principais instituições de ensino superior do Brasil. Com um campus vibrante e diversificado, a UFSCar oferece uma variedade de cursos em diferentes áreas do conhecimento, promovendo um ambiente de aprendizado dinâmico e inclusivo. A universidade se destaca pela excelência em pesquisa, ensino e extensão, contribuindo significativamente para o desenvolvimento científico, tecnológico e social. Além de sua infraestrutura de ponta, a UFSCar é conhecida por seu compromisso com a sustentabilidade e a responsabilidade social, buscando constantemente maneiras de melhorar a vida na comunidade local e global.',
    image: LogoUfscar,
  },
  {
    id: 1,
    title: 'Curso de Interação Humano-Computador',
    description:
      'A disciplina de Interação Humano-Computador (IHC) na UFSCar é parte fundamental do currículo do Departamento de Computação. Este curso explora os princípios e práticas de design de interfaces de usuário, centrando-se na criação de sistemas computacionais que sejam tanto funcionais quanto intuitivos. Através de uma combinação de teoria e prática, os alunos aprendem a projetar, avaliar e implementar interfaces de usuário eficazes, considerando a experiência e a perspectiva do usuário final. O curso enfatiza a importância da empatia e do entendimento das necessidades humanas no processo de design, preparando os alunos para enfrentar desafios reais e inovar na área de tecnologia.',
    image: IHC,
  },
  {
    id: 2,
    title: 'Desenvolvimento de um Aplicativo para Saúde Emocional dos Alunos',
    description:
      'Em resposta aos crescentes desafios de saúde mental enfrentados pelos alunos, a UFSCar está explorando o desenvolvimento de um aplicativo destinado a apoiar a saúde emocional dos estudantes do Departamento de Computação. Este aplicativo visa oferecer recursos como dicas de gerenciamento de estresse, exercícios de mindfulness, e um espaço seguro para expressar e entender emoções. A iniciativa reflete o compromisso da universidade em apoiar o bem-estar de seus alunos, reconhecendo a importância da saúde mental na educação superior.',
    image: MentalHealth,
  },
];

export function About() {
  const navigate = useNavigate();

  return (
    <div style={{ flex: 1, padding: 16 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Button
          style={{ width: 400, height: 64, fontSize: 24, marginLeft: 16 }}
          variant="contained"
          onClick={() => navigate('/facial-recognition')}
        >
          Reconhecimento Facial
        </Button>

        <img style={{ width: 150, height: 150 }} src={AppIcon} />

        <Button
          style={{ width: 400, height: 64, fontSize: 24, marginRight: 16 }}
          variant="contained"
          onClick={() => navigate('/')}
        >
          Voltar a tela inicial
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          overflow: 'auto',
        }}
      >
        {infos.map(({ title, description, image }) => (
          <Card
            key={title}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 400,
              margin: '0px 8px',
              padding: 16,
            }}
          >
            <Typography variant="h5" component="div">
              {title}
            </Typography>

            <Typography variant="body2">{description}</Typography>

            <img
              style={{
                width: 200,
                height: 200,
                objectFit: 'contain',
                marginTop: 16,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              src={image}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
