import styled from 'styled-components';
import Tooltip from '../ToolTip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    label {
      display: flex;
      color: var(--fnt-base);
      margin-bottom: 8px;
      line-height: 24px;
    }

    input {
      width: 100%;
      background: var(--bg-input);
      border: 1px solid var(--bg-border);
      border-radius: 20px;
      outline: none;
      color: var(--fnt-title);
      height: 64px;
      padding: 0 16px;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
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
