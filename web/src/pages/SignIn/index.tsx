import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '../../hooks/themes';
import Input from '../../components/Input';

import logoLight from '../../images/logo2-light.svg';
import logoDark from '../../images/logo2-dark.svg';
// import landingLight from '../../images/landing-light.svg';
// import landingDark from '../../images/landing-dark.svg';

import {
  Container,
  LeftSide,
  RightSide,
  Forms,
} from './styles';

function SignIn() {
  const { ToggleTheme, theme } = useTheme();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  return (
    <Container>
      <LeftSide>
        <div className="content">
          {theme.title === 'light' ? (
            <img src={logoLight} alt="Happy" />
          ) : (
            <img src={logoDark} alt="Happy" />
          )}
          <div className="location">
            <strong>Mantena</strong>
            <span>Minas Gerais</span>
          </div>
        </div>
      </LeftSide>
      <RightSide>
        <div className="header">
          <button type="button" className="back" onClick={() => history.goBack()}>
            <FiArrowLeft size={20} />
          </button>

          <button type="button" className="theme" onClick={ToggleTheme}>
            {theme.title === 'light' ? (
              <FiMoon size={20} color="#15C3D6" />
            ) : (
              <FiSun size={20} color="#fff" />
            ) }
          </button>
        </div>

        <div className="content">
          <strong>Fazer Login</strong>

          <Forms onSubmit={() => {}} ref={formRef}>
            <Input name="email" title="E-mail" />
            <Input name="passoword" title="Senha" />

            <div className="footer-form">
              <div className="remember">
                <input type="checkbox" className="checkbox" />
                <span>
                  Lembrar-me
                </span>
              </div>
              <Link to="/">
                Esqueci minha senha
              </Link>
            </div>
            <button type="button">
              Entrar
            </button>
          </Forms>
        </div>
      </RightSide>
    </Container>
  );
}

export default SignIn;
