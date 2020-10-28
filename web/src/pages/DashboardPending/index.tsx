import React, { useMemo } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import { FiTrash, FiEdit3 } from 'react-icons/fi';

import { useTheme } from '../../hooks/themes';
import SideBar from '../../components/SideBar';

import mapMarkerLight from '../../images/map-marker-light.svg';
import mapMarkerDark from '../../images/map-marker-dark.svg';

import {
  Container, Main, Title, OrphanagesContainer, Orphanage,
} from './styles';

const DashboardPending: React.FC = () => {
  const { theme } = useTheme();

  const orphanage = {
    latitude: -18.7856201,
    longitude: -40.9687827,
  };

  const mapIcon = useMemo(() => Leaflet.icon({
    iconUrl: theme.title === 'light' ? mapMarkerLight : mapMarkerDark,

    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  }), [theme]);

  return (
    <Container>
      <SideBar isRestricted />

      <Main>
        <Title>
          <strong>Orfanatos Cadastrados</strong>
          <span>2 orfanatos</span>
        </Title>

        <hr />

        <OrphanagesContainer>
          <Orphanage>
            <Map
              center={[orphanage.latitude, orphanage.longitude]}
              zoom={16}
              style={{ width: '100%', height: 200, borderRadius: '20px 20px 0 0' }}
              dragging={false}
              touchZoom={false}
              zoomControl={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
            >
              <TileLayer
                url={
                    `https://api.mapbox.com/styles/v1/mapbox/${theme.title}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
                  }
              />
              <Marker
                interactive={false}
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
              />
            </Map>

            <footer>
              <strong>Orf. Esperança</strong>

              <div className="options">
                <button type="button">
                  <FiEdit3 />
                </button>
                <button type="button">
                  <FiTrash />
                </button>
              </div>
            </footer>
          </Orphanage>

          <Orphanage>
            <Map
              center={[orphanage.latitude, orphanage.longitude]}
              zoom={16}
              style={{ width: '100%', height: 200, borderRadius: '20px 20px 0 0' }}
              dragging={false}
              touchZoom={false}
              zoomControl={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
            >
              <TileLayer
                url={
                    `https://api.mapbox.com/styles/v1/mapbox/${theme.title}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
                  }
              />
              <Marker
                interactive={false}
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
              />
            </Map>

            <footer>
              <strong>Orf. Esperança</strong>

              <div className="options">
                <button type="button">
                  <FiEdit3 />
                </button>
                <button type="button">
                  <FiTrash />
                </button>
              </div>
            </footer>
          </Orphanage>
        </OrphanagesContainer>
      </Main>
    </Container>
  );
};

export default DashboardPending;
