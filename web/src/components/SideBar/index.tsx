import React from 'react';
import {
  FiArrowLeft, FiInfo, FiMoon, FiSun, FiMapPin,
} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../hooks/themes';

import mapMarkerLight from '../../images/map-marker-light.svg';
import mapMarkerDark from '../../images/map-marker-dark.svg';

import {
  Container, Theme, Main, Approves, Pending, Footer,
} from './styles';

interface sideBarProps {
  isRestricted?: boolean;
}

const SideBar: React.FC<sideBarProps> = ({ isRestricted = false }) => {
  const { ToggleTheme, theme } = useTheme();
  const { goBack } = useHistory();

  return (
    <Container>
      {theme.title === 'light' ? (
        <img src={mapMarkerLight} alt="Happy" />
      ) : (
        <img src={mapMarkerDark} alt="Happy" />
      )}

      {isRestricted && (
        <Main>
          <Approves to="/dashboard/approves">
            <FiMapPin size={32} />
          </Approves>
          <Pending to="/dashboard/pending">
            <FiInfo size={32} />
          </Pending>
        </Main>
      )}

      <Footer>
        <Theme type="button" onClick={ToggleTheme}>
          {theme.title === 'light' ? (
            <FiMoon size={32} color="#fff" />
          ) : (
            <FiSun size={32} color="#fff" />
          ) }
        </Theme>

        <button type="button" onClick={goBack} className="goBack">
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </Footer>
    </Container>
  );
};

export default SideBar;
