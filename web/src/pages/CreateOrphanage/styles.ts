import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  main {
    flex: 1;
  }
`;

export const Form = styled.form`
  width: 700px;
  margin: 64px auto;

  background: var(--bg-form);
  border: 1px solid var(--bg-border);
  border-radius: 20px;

  padding: 64px 80px;

  overflow: hidden;

  .leaflet-container{
    margin-bottom: 40px;
    border: 1px solid var(--bg-border);
    border-radius: 20px;
  }

  fieldset {
    border: 0;
    
    & + fieldset {
      margin-top: 80px;
    }

    legend {
      width: 100%;

      font-size: 32px;
      line-height: 34px;
      color: var(--fnt-title);
      font-weight: 700;

      border-bottom: 1px solid var(--bg-border);
      margin-bottom: 40px;
      padding-bottom: 24px;
    }
  }

  .input-block{

    & + .input-block {
      margin-top: 24px;
    }

    label {
      display: flex;
      color: var(--fnt-base);
      margin-bottom: 8px;
      line-height: 24px;
    }

    span {
      font-size: 14px;
      color: var(--fnt-base);
      margin-left: 24px;
      line-height: 24px;
    }

    input,textarea {
      width: 100%;
      background: var(--bg-input);
      border: 1px solid var(--bg-border);
      border-radius: 20px;
      outline: none;
      color: var(--fnt-title);
    }

    input {
      height: 64px;
      padding: 0 16px;
    }

    textarea {
      min-height: 120px;
      max-height: 240px;
      resize: vertical;
      padding: 16px;
      line-height: 28px;
    }

    .images-container {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 16px;

      img {
        width: 100%;
        height: 96px;
        object-fit: cover;
        border-radius: 20px;
      }
    }

    .new-image {
      height: 96px;
      background: var(--bg-input);
      border: 1px dashed var(--bg-border);
      border-radius: 20px;
      color : var(--bg-button);
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    input[type=file] {
      display: none;
    }

    .button-select {
      display: grid;
      grid-template-columns: 1fr 1fr;

      button {
        height: 64px;
        background: var(--bg-input);
        border: 1px solid var(--bg-border);
        color: var(--fnt-title);
        cursor: pointer;

        &:first-child {
          border-radius: 20px 0px 0px 20px;
        }
        
        &:last-child {
          border-radius: 0 20px 20px 0;
          border-left: 0;
        }

        &.active {
          background: var(--bg-active);
          border: 1px solid var(--bg-border-active);
          color: var(--bg-text-active);
        }
      }
    }
  }

  .confirm-button {
    margin-top: 64px;

    width: 100%;
    height: 64px;
    border: 0;
    cursor: pointer;
    background: var(--bg-confirm);
    border-radius: 20px;
    color: var(--bg-confirm-text);
    font-weight: 800;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s;

    &:hover {
      background: var(--bg-confirm-hover);
    }

    svg {
      margin-right: 16px;
    }
  }
`;
