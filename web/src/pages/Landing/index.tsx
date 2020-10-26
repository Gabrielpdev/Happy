import React from 'react';
import { FiArrowRight, FiSun, FiMoon } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '../../hooks/themes';

import logoLight from '../../images/logo-light.svg';
import logoDark from '../../images/logo-dark.svg';
import landingLight from '../../images/landing-light.svg';
import landingDark from '../../images/landing-dark.svg';

import {
  Container, Content, HeaderContent, RightSide, FooterContent,
} from './styles';

function Landing() {
  const { ToggleTheme, theme } = useTheme();
  const history = useHistory();

  return (
    <Container>
      <Content>

        <HeaderContent>
          {theme.title === 'light' ? (
            <img src={logoLight} alt="Happy" />
          ) : (
            <img src={logoDark} alt="Happy" />
          )}
          <RightSide>
            <Link className="access" to="/login">
              <strong>Acesso Restrito</strong>
            </Link>
            <button type="button" onClick={ToggleTheme}>
              {theme.title === 'light' ? (
                <FiMoon size={40} color="#fff" />
              ) : (
                <FiSun size={40} color="#fff" />
              ) }
            </button>
          </RightSide>
        </HeaderContent>

        <main>
          <h1>Leve Felicidade para o mundo</h1>
        </main>
        {theme.title === 'light' ? (
          <img src={landingLight} alt="Happy" />
        ) : (
          <img src={landingDark} alt="Happy" />
        )}

        <FooterContent>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
          <Link to="/app" className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </Link>
        </FooterContent>
      </Content>
    </Container>
  );
}

export default Landing;
