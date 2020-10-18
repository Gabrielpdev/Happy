import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  span {
    background: #c53030;
    border-radius: 4px;
    padding: 8px;

    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #fff;
    
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    opacity: 0;

    transition: opacity 0.4s;
    transform: translateX(-50%);

    &::before {
      content: '';
      border-style: solid;
      border-color: #c53030 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
