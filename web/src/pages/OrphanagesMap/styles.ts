import styled from 'styled-components';
import { Map } from 'react-leaflet';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display:flex;

  aside {
    width: 440px;
    padding: 40px 80px;

    background: linear-gradient(329.54deg, var(--bg-linear-primary) 0%, var(--bg-linear-secondary) 100%);
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2{
      font-size: 48px;
      font-weight: 800;
      line-height: 42px;
      margin-top: 64px;
    }

    p {
    line-height: 28px;
    margin-top: 24px;
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .location {
      display:flex;
      flex-direction: column;

      line-height: 24px;
      
      strong {
      font-weight: 800;
      }
    }

    button {
      border:0;
      background: none;
      cursor: pointer;
    }
  }

  .leaflet-container{
    z-index: 5;
  }

  .create-orphanage{
    position: absolute;
    right: 48px;
    bottom: 48px;

    z-index: 10;
    
    width: 64px;
    height: 64px;
    background: var(--bg-button);
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s;

    &:hover{
    background: var(--bg-button_hover);
    } 
  }
`;

export const Maps = styled(Map)`
  width: 100%;
  height: 100%;
`;

