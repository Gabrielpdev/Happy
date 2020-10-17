import React, { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import mapMarker from '../../images/mapMarker.png';
import api from '../../services/api';

import {
  Container,
  Map,
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText,
  Button,
} from './styles';

interface OrphanagesProps {
  name: string;
  id: string;
  latitude: number;
  longitude: number;
}
interface LoctionPorps {
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<OrphanagesProps[]>([]);
  const [location, setLocation] = useState<LoctionPorps>();

  useFocusEffect(
    useCallback(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data);
      });
    }, []),
  );

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

  const handleNavigateToOrphanageDetails = useCallback((id: string) => {
    navigation.navigate('OrphanageDetails', { id });
  }, []);

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, []);

  if (!location) {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <ActivityIndicator
          size={70}
          color="#15c3d6"
          style={{ alignItems: 'center' }}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            icon={mapMarker}
            coordinate={{
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude),
            }}
          >
            <Callout
              tooltip
              onPress={() => {
                handleNavigateToOrphanageDetails(orphanage.id);
              }}
            >
              <CalloutContainer>
                <CalloutText>{orphanage.name}</CalloutText>
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </Map>

      <Footer>
        <FooterText>{`${orphanages.length} orfanatos encontrados`}</FooterText>
        <Button onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" />
        </Button>
      </Footer>
    </Container>
  );
};

export default OrphanagesMap;
