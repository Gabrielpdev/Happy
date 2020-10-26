import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;


`;
export const LeftSide = styled.div`
  width: 100%;
  height: 100%;

  display:flex;
  align-items:center;
  justify-content: center;

  background: linear-gradient(329.54deg, var(--bg-linear-primary) 0%, var(--bg-linear-secondary) 100%);

  .location{
    display:flex;
    flex-direction:column;
    align-items:center;

    margin-top: 50px;
  }

`;

export const RightSide = styled.div`
  width: 60%;
  height: 100%;
  position:relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: var(--bg-form);

  .header{
    display:flex;
    align-items:center;
    justify-content: flex-end;

    padding: 0 80px;
    margin-bottom: 50px;
    width: 100%;
  }
  
  .back{
    padding: 15px;
    border: 0;
    border-radius:16px;

    background: var(--btn-login);
    color: var(--text-login);

  }

  .theme{
    margin-left: 5px;
    padding: 15px;
    border: 0;
    border-radius:16px;

    background: var(--btn-login);

  }

  .content{
    width: 100%;

    padding: 0 80px;

    >strong{
      font-family: Nunito;
      font-size: 32px;
      font-weight: 700;
      line-height: 34px;
      letter-spacing: 0em;
      text-align: left;
      color: var(--fnt-title);
      margin-bottom: 24px;
      display:block;
    }
  }
`;

export const Forms = styled(Form)`
  >label{
    color: var(--fnt-title);;
    margin-top: 16px;
    display:block;
  }

  .footer-form{
    display: flex;
    align-items:center;
    justify-content: space-between;
    color: var(--fnt-title);
    width: 100%;

    margin: 24px 0 40px;

    .remember{
      display:flex;
      align-items:center;
      justify-content: center;
    }

    input[type=checkbox] {
      position: relative;
      margin-right: 20px;
      width: 10px;
      height: 20px;

      cursor: pointer;
    }
    input[type=checkbox]:before {
      content: "";
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      top: 0;
      left: 0;
      background: #F5F8FA;
      border: 1px solid #D3E2E5;
      border-radius: 8px;
      
    }

    input[type=checkbox]:checked:before{
      background: #37C77F;
    }
    input[type=checkbox]:checked:after {
      content: "";
      display: block;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      top: 3px;
      left: 7px;
    }

    >a{
      text-decoration: none;
      color: var(--fnt-title);

      &:hover{
        text-decoration:underline;
      }
    }
  }


  >button {
    display: flex;
    align-items:center;
    justify-content: center;
    padding: 21px 0 ;
    width: 100%;

    border-radius: 20px;
    border: 0;
    background: #37C77F;
    color: #fff;
  }
`;
