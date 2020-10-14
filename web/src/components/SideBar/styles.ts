import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(329.54deg, var(--bg-linear-primary) 0%, var(--bg-linear-secondary) 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 48px;
  }
`;

export const Footer = styled.div`
  .goBack {
    width: 48px;
    height: 48px;

    border: 0;

    background: var(--bg-button);
    border-radius: 16px;

    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: var(--bg-button_hover);
    }
  }
`;

export const Theme = styled.button`
  margin-bottom: 5px;
  background: none;
  border: 0;

  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
