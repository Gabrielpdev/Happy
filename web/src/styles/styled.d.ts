import 'styled-components';

declare module 'styled-components'{
  export interface DefaultTheme {
    title: string;
    background: {
      primary: string;
      secondary: string;
      linear_primary: string,
      linear_secondary: string,
      button: string;
      button_hover: string;
      button_hover_light: string;
    },
  }
}