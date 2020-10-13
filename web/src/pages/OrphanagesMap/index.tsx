import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSun, FiMoon } from 'react-icons/fi';
import { TileLayer } from 'react-leaflet';
import { useTheme } from '../../hooks/Themes';

import 'leaflet/dist/leaflet.css';

import { Container, Maps } from './styles';

import mapMarkerLight from '../../images/map-marker-light.svg';
import mapMarkerDark from '../../images/map-marker-dark.svg';

function OrphanagesMap() {
  const { ToggleTheme, theme } = useTheme();

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
        zoom={16.4}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/${theme.title}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Maps>

      <Link to='' className='create-orphanage'>
        <FiPlus size={32} color='#fff'/>
      </Link>
    </Container>
  )
}

export default OrphanagesMap;
