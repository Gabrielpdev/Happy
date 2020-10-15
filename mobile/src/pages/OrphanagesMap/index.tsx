import React, { useCallback } from 'react';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../../images/mapMarker.png';

import { Container, Map, CalloutContainer, CalloutText, Footer, FooterText, Button } from './styles';
import { useNavigation } from '@react-navigation/native';

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToOrphanageDetails = useCallback(() => {
    navigation.navigate('OrphanageDetails');
  },[])

  return (
    <Container>
      <Map 
      provider={PROVIDER_GOOGLE}
      
      initialRegion={{
        latitude: -18.782285,
        longitude: -40.978958,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}>
        <Marker 
          calloutAnchor={{
            x:2.7,
            y:0.8
          }}
          icon={mapMarker}
          coordinate={{
            latitude: -18.782285,
            longitude: -40.978958,
          }}
        >
          <Callout tooltip onPress={handleNavigateToOrphanageDetails} >
            <CalloutContainer>
              <CalloutText>Lar das meninas</CalloutText>
            </CalloutContainer>
          </Callout>
        </Marker>
      </Map>

      <Footer>
        <FooterText>2 orfanatos encontrados</FooterText>
        <Button onPress={() => {}} >
          <Feather name='plus' size={20} color="#fff" />
        </Button>
      </Footer>

    </Container>
    );
}

export default OrphanagesMap;