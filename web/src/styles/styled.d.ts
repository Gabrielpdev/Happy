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
      confirm_hover: string;
      btn_access: string;
      btn_access_hover: string;
      btn_login: string;
      btn_sideBar: string,
      btn_map: string,
      btn_map_hover: string,
    },
    font: {
      primary: string;
      title:string;
      base:string;
      text_access: string,
      text_access_hover: string,
      text_login: string,
    }
  }
}
