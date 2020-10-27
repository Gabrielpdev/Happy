import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useTheme } from '../../hooks/themes';
import Input from '../../components/Input';
import getValidationErros from '../../utils/getValidationErros';
import { useToast } from '../../hooks/toast';

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
import { useAuth } from '../../hooks/auth';

interface DataProps {
  email: string;
  password: string;
}

function SignIn() {
  const { ToggleTheme, theme } = useTheme();
  const { addToast } = useToast();
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(async (data: DataProps) => {
    const { email, password } = data;
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email('Deve ser um email válido').required('Email é obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate({ email, password }, {
        abortEarly: false,
      });

      await signIn({ email, password });

      history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro no login',
        description: 'Ocorreu um erro ao fazer o login, tente novamente.',
      });
    }
  }, [addToast, signIn, history]);

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

          <Forms onSubmit={handleSubmit} ref={formRef}>
            <Input name="email" title="E-mail" type="email" />
            <Input name="password" title="Senha" type="password" />

            <div className="footer-form">
              <div className="remember">
                <input
                  type="checkbox"
                  className="checkbox"
                />
                <span>
                  Lembrar-me
                </span>
              </div>
              <Link to="/">
                Esqueci minha senha
              </Link>
            </div>
            <button type="submit">
              Entrar
            </button>
          </Forms>
        </div>
      </RightSide>
    </Container>
  );
}

export default SignIn;
