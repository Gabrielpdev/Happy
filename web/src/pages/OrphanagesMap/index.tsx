import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSun, FiMoon, FiArrowRight } from 'react-icons/fi';
import { TileLayer, Marker, Popup } from 'react-leaflet';
import { useTheme } from '../../hooks/Themes';
import Leaflet from 'leaflet';
import api from '../../services/api';

import mapMarkerLight from '../../images/map-marker-light.svg';
import mapMarkerDark from '../../images/map-marker-dark.svg';

import { Container, Maps } from './styles';

interface OrphanageProps {
  id: string,
  name: string,
  latitude: number,
  longitude: number,
}

function OrphanagesMap() {
  const { ToggleTheme, theme } = useTheme();
  const [ orphanages, setOrphanages ] = useState<OrphanageProps[]>([]);

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    })
  },[])

  const mapIcon = useMemo(() => {
    return Leaflet.icon({
     iconUrl: theme.title === 'light' ? mapMarkerLight : mapMarkerDark,
   
     iconSize: [58, 68],
     iconAnchor: [29, 68],
     popupAnchor: [170, 2]
   })
  },[theme]);

  return (
    <Container>
      <aside>
        <header>
          {theme.title === 'light' ? (
            <img src={mapMarkerLight} alt="Happy"/>
            ): (
            <img src={mapMarkerDark} alt="Happy"/>
          )}

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <div className="location">
            <strong>Mantena</strong>
            <span>Minas Gerais</span>
          </div>
          <button type="button" onClick={ToggleTheme}>
            {theme.title === 'light' ? (
              <FiMoon size={32} color='#fff' /> 
            ): (
              <FiSun size={32} color='#fff' /> 
            ) }
            </button>
        </footer>
      </aside>

      <Maps
        center={[-18.782285,-40.978958]}
        zoom={15}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/${theme.title}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        {orphanages.map( orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude,orphanage.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup' >
              {orphanage.name}
              <Link to={`/orphanage/${orphanage.id}`}>
                <FiArrowRight size={20} color='#fff' />
              </Link>
            </Popup>
          </Marker>
        ))}
              
      </Maps>

      <Link to='orphanage/create' className='create-orphanage'>
        <FiPlus size={32} color='#fff'/>
      </Link>
    </Container>
  )
}

export default OrphanagesMap;
