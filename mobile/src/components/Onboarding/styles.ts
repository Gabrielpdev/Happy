import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

interface DotProps {
  selected: boolean;
}

export const ContainerIcon = styled(RectButton)`
  height: 56px;
  width: 56px;
  border-radius: 20px;

  background: #d1edf2;
  border-radius: 20px;

  align-items: center;
  justify-content: center;

  margin-right: 40px;
`;

export const DotIcon = styled.View<DotProps>`
  width: ${props => (props.selected ? '16px' : '8px')};
  height: 6px;
  border-radius: 4px;
  margin: 0 3px;
  background: ${props => (props.selected ? '#FFD152' : '#BECFD8')};
`;

export const Title = styled.Text`
  width: 240px;

  font-family: 'Nunito_800ExtraBold';
  font-size: 48px;
  line-height: 48px;

  margin: 0 auto 0 40px;
  padding-top: 10px;

  color: #0089a5;
`;

export const Subtitle = styled.Text`
  width: 260px;

  font-family: 'Nunito_600SemiBold';
  font-size: 20px;
  line-height: 30px;
  text-align: left;

  margin-right: auto;
  margin-left: 40px;

  color: #5c8599;
`;

export const CheckIcon = styled(Feather)`
  color: #0089a5;
`;

export const ArrowIcon = styled(Feather)`
  color: #0089a5;
`;
