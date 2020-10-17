import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import { useRoute } from '@react-navigation/native';
import mapMarkerImg from '../../images/mapMarker.png';
import api from '../../services/api';

import {
  Container,
  ImageContainer,
  Image,
  DetailContainer,
  Title,
  Description,
  MapContainer,
  Map,
  RoutesContainer,
  RoutesText,
  Separator,
  ScheduleContainer,
  ScheduleItem,
  ScheduleText,
  ContactButton,
  ContactButtonText,
} from './styles';

interface OrphanageDetailsRouteParams {
  id: string;
}

interface OrphanageProps {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: string;
    url: string;
  }>;
}

export default function OrphanageDetails() {
  const route = useRoute();
  const params = route.params as OrphanageDetailsRouteParams;

  const [orphanage, setOrphanage] = useState<OrphanageProps>();

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(response => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  const handleOpenGoogleMap = useCallback(() => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`,
    );
  }, []);

  if (!orphanage) {
    return (
      <View>
        <Description>...Carregando</Description>
      </View>
    );
  }
  return (
    <Container>
      <ImageContainer>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(image => (
            <Image
              source={{ uri: image.url.replace('localhost', '192.168.0.112') }}
              key={image.id}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </ImageContainer>

      <DetailContainer>
        <Title>{orphanage.name}</Title>
        <Description>{orphanage.about}</Description>

        <MapContainer>
          <Map
            initialRegion={{
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude),
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.longitude),
              }}
            />
          </Map>

          <RoutesContainer onPress={handleOpenGoogleMap}>
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <ScheduleContainer>
          <ScheduleItem>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <ScheduleText>Segunda à Sexta 8h às 18h</ScheduleText>
          </ScheduleItem>

          <ScheduleItem type={orphanage.open_on_weekends ? 'green' : 'red'}>
            <Feather
              name="info"
              size={40}
              color={orphanage.open_on_weekends ? '#39CC83' : '#ff669d'}
            />
            <ScheduleText type={orphanage.open_on_weekends ? 'green' : 'red'}>
              {orphanage.open_on_weekends
                ? 'Atendemos fim de semana'
                : 'Não atendemos fim de semana'}
            </ScheduleText>
          </ScheduleItem>
        </ScheduleContainer>
        <ContactButton onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton>
      </DetailContainer>
    </Container>
  );
}
