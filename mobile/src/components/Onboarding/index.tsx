import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, View, Button, Text } from 'react-native';
import Onboarding, { DotProps } from 'react-native-onboarding-swiper';

import Ilustra01 from '../../images/Ilustra01.png';
import Ilustra02 from '../../images/Ilustra02.png';

import {
  ContainerIcon,
  DotIcon,
  CheckIcon,
  ArrowIcon,
  Title,
  Subtitle,
} from './styles';

const Simple = () => {
  const navigation = useNavigation();

  const Dot = ({ selected }: DotProps) => {
    return <DotIcon selected={selected} />;
  };

  const Done = ({ ...props }) => (
    <ContainerIcon {...props}>
      <CheckIcon size={25} name="check" />
    </ContainerIcon>
  );

  const Next = ({ ...props }) => (
    <ContainerIcon {...props}>
      <ArrowIcon size={25} name="arrow-right" />
    </ContainerIcon>
  );

  return (
    <Onboarding
      DotComponent={Dot}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onDone={() => navigation.navigate('OrphanagesMap')}
      showSkip={false}
      bottomBarColor="#F2F3F5"
      bottomBarHeight={80}
      pages={[
        {
          backgroundColor: '#F2F3F5',
          image: <Image source={Ilustra01} />,
          title: <Title>Leve felicidade para o mundo</Title>,
          subtitle: (
            <Subtitle>
              Visite orfanatos e mude o dia de muitas crianças.
            </Subtitle>
          ),
        },
        {
          backgroundColor: '#F2F3F5',
          image: <Image source={Ilustra02} />,
          title: (
            <Title
              style={{
                width: 300,
                textAlign: 'right',
                fontSize: 30,
                marginBottom: 48,
                lineHeight: 36,
              }}
            >
              Escolha um orfanato no mapa e faça uma visita
            </Title>
          ),
          subtitle: '',
        },
      ]}
    />
  );
};

export default Simple;
