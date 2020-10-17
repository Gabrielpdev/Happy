import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import { useNavigation } from '@react-navigation/native';
import { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../../images/mapMarker.png';

import { Container, Map, NextButton, NextButtonText } from './styles';

interface LoctionPorps {
  latitude: number;
  longitude: number;
}

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [location, setLocation] = useState<LoctionPorps>();

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
      }

      const data = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
    })();
  }, []);

  if (!location) {
    return (
      <Container>
        <NextButtonText>...Carregando</NextButtonText>
      </Container>
    );
  }

  return (
    <Container>
      <Map
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </Map>

      {position.latitude !== 0 && (
        <NextButton onPress={handleNextStep}>
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      )}
    </Container>
  );
}
