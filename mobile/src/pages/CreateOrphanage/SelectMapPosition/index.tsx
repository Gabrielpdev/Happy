import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import * as Location from 'expo-location';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../../images/mapMarker.png';

interface LoctionPorps {
  latitude: number; 
  longitude: number;
}

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({latitude: 0, longitude: 0});
  const [location, setLocation] = useState<LoctionPorps>();

  function handleNextStep() {
    navigation.navigate('OrphanageData', {position});
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
      setLocation({latitude:data.coords.latitude, longitude: data.coords.longitude});
    })();
  }, []);

  if(!location){
    return(
      <View style={styles.container}>
      <Text style={styles.loadingText}>...Carregando</Text>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  loadingText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#15c3d6',
  }
})