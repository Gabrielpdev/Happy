import React, { useState } from 'react';
import { Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import api from '../../../services/api';

import {
  Container,
  Title,
  Label,
  Input,
  UploadedImageContainer,
  UploadedImage,
  ImagesInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
} from './styles';

interface OrphanageDetailsRouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

export default function OrphanageData() {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as OrphanageDetailsRouteParams;

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Precisamos da permissao de acesso as suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;

    setImages([...images, uri]);
  }

  async function handleSubmit() {
    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(params.position.latitude));
    data.append('longitude', String(params.position.longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    await api.post('/orphanages', data);

    navigation.navigate('OrphanagesMap');
  }

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>Dados</Title>

      <Label>Nome</Label>
      <Input value={name} onChangeText={text => setName(text)} />

      <Label>Sobre</Label>
      <Input
        style={{ height: 110 }}
        multiline
        value={about}
        onChangeText={text => setAbout(text)}
      />

      <Label>Whatsapp</Label>
      <Input />

      <Label>Fotos</Label>

      <UploadedImageContainer>
        {images.map(image => (
          <UploadedImage key={image} source={{ uri: image }} />
        ))}
      </UploadedImageContainer>

      <ImagesInput onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </ImagesInput>

      <Title>Visitação</Title>

      <Label>Instruções</Label>
      <Input
        style={{ height: 110 }}
        multiline
        value={instructions}
        onChangeText={text => setInstructions(text)}
      />

      <Label>Horario de visitas</Label>
      <Input
        value={opening_hours}
        onChangeText={text => setOpeningHours(text)}
      />

      <SwitchContainer>
        <Label>Atende final de semana?</Label>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </SwitchContainer>

      <NextButton onPress={handleSubmit}>
        <NextButtonText>Cadastrar</NextButtonText>
      </NextButton>
    </Container>
  );
}
