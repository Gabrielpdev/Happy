import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Main = styled.main`
  width: 1120px;
  margin: 64px auto;
  padding: 0 112px;

  overflow: hidden;

  hr {
    width: 100%;
    height: 1px;
    border: 0;
    background: #D3E2E6;
    margin: 24px 0 40px;
  }
`;

export const Title = styled.div`
  display:flex;
  justify-content:space-between;

  margin:0;

  >strong{
    font-size: 32px;
    font-weight: 700;
    line-height: 34px;
    text-align: left;

    color: var(--fnt-title);
  }

  >span{
    font-weight: 600;
    line-height: 22px;
    text-align: right;

    color: var(--fnt-title);
  }

`;

export const OrphanagesContainer = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  width: 100%;
`;

export const Orphanage = styled.div`
  max-width:430px;
  width: 100%;

  background: #fff;
  border: 1px solid var(--bg-border-map);
  border-radius: 20px;

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 32px;

    >strong{
      font-weight: bold;
      font-size: 24px;
      line-height: 34px;
      color: #4D6F80;
    }

    .options{
      > button {
        width: 48px;
        height: 48px;

        border: 0;
        padding: 12px;

        background: var(--btn-map);
        border-radius: 16px;
        color: var(--text-login);

        &:first-child {
          margin-right: 8px;
        }

        &:hover{
          background: var(--btn-map-hover);
        }

      }
    }
  }

  .leaflet-container {
    border-bottom: 1px solid #DDE3F0;
    border-radius: 20px;
  }
`;
