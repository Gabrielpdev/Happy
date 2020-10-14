import 'styled-components';

declare module 'styled-components'{
  export interface DefaultTheme {
    title: string;
    background: {
      body: string;
      form: string;
      border: string;
      border_map: string;
      input: string;
      active: string,
      border_active: string,
      text_active: string,
      primary: string;
      secondary: string;
      linear_primary: string,
      linear_secondary: string,
      button: string;
      button_hover: string;
      button_hover_light: string;
      confirm: string;
      confirm_text: string;
      confirm_hover: srting;
    },
    font: {
      primary: string;
      title:string;
      base:string;
    }
  }
}