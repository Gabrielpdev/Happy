import styled from 'styled-components';
import Tooltip from '../ToolTip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--bg-border);
  border-radius: 20px;
  outline: none;
  height: 64px;
  padding: 0 16px;
  
  display: flex;

  input{
    color: var(--fnt-title);
    width: 100%;
    border: 0;
    background: none;
  }

  label {
    color: var(--fnt-base);
    margin-bottom: 8px;
    line-height: 24px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin: auto  0 auto 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
