import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(329.54deg, var(--bg-linear-primary) 0%, var(--bg-linear-secondary) 100%);

`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;

  height: 100%;
  max-height: 680px;

  display: flex;
  align-items: flex-start;
  flex-direction:column;
  justify-content: space-between;


  main{
    h1 {
      max-width: 350px;
      font-size: 76px;
      font-weight: 900;
      line-height: 70px;
    }
  }

  >img {
    position: absolute;
    right: 20%;
    top: 5%;
    width:40%
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 4%;

  width: 100%;
`;

export const RightSide = styled.div`
  display: flex;
  align-items:center;

  .access{
    right: 0;
    top: 0;
    text-decoration: none;
    background: var(--btn-access);
    color: var(--text-access);

    padding: 13px 40px;
    border-radius: 20px;

    font-size: 24px;
    line-height: 24px;

    display: flex;
    flex-direction: column;

    text-align: right;

    transition: 0.3s background;

    &:hover{
      background: var(--btn-access-hover);
      color: var(--text-access-hover);
    }

    strong{
      text-align: center;
      font-weight: 800;
    }
  }

  > button{
    margin-left: 10px;
    border:0;
    background: none;
  }
`;

export const FooterContent = styled.div`
  display:flex;
  justify-content: space-between;
  width: 100%;

  margin-bottom: 3%;


  p {
    max-width: 350px;
    margin-top: 40px;
    font-size: 24px;
    line-height: 24px;
  }

  .enter-app{
    width: 80px;
    height: 80px;
    background: var(--bg-secondary);
    border-radius: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;

    &:hover{
      background: var(--bg-button_hover_light);
    }
  }
`;
