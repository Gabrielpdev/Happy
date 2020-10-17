import React, { useCallback, useState } from 'react';
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import { Feather } from '@expo/vector-icons';

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

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<OrphanagesProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data);
      });
    }, []),
  );

  const handleNavigateToOrphanageDetails = useCallback((id: string) => {
    navigation.navigate('OrphanageDetails', { id });
  }, []);

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, []);

  return (
    <Container>
      <Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -18.782285,
          longitude: -40.978958,
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
