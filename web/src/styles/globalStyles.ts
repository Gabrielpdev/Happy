import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: #fff;
    background: var(--bg-body);
  }

  body, input, button, textarea {
    font: 600 18px Nunito, sans-serif;
    outline: none;
  }

  button{
    cursor:pointer;
  }

  :root {
    --bg-body: ${(props) => props.theme.background.body};
    --bg-form: ${(props) => props.theme.background.form};
    --bg-border: ${(props) => props.theme.background.border};
    --bg-border-map: ${(props) => props.theme.background.border_map};
    --bg-input: ${(props) => props.theme.background.input};
    --bg-active: ${(props) => props.theme.background.active};
    --bg-text-active: ${(props) => props.theme.background.text_active};
    --bg-border-active: ${(props) => props.theme.background.border_active};
    --bg-primary: ${(props) => props.theme.background.primary};
    --bg-secondary: ${(props) => props.theme.background.secondary};
    --bg-linear-primary: ${(props) => props.theme.background.linear_primary};
    --bg-linear-secondary: ${(props) => props.theme.background.linear_secondary};
    --bg-button: ${(props) => props.theme.background.button};
    --bg-button_hover: ${(props) => props.theme.background.button_hover};
    --bg-button_hover_light: ${(props) => props.theme.background.button_hover_light};
    --bg-confirm: ${(props) => props.theme.background.confirm};
    --bg-confirm-text: ${(props) => props.theme.background.confirm_text};
    --bg-confirm-hover: ${(props) => props.theme.background.confirm_hover};
    --fnt-primary: ${(props) => props.theme.font.primary};
    --fnt-title: ${(props) => props.theme.font.title};
    --fnt-base: ${(props) => props.theme.font.base};
    --btn-access: ${(props) => props.theme.background.btn_access};
    --btn-access-hover: ${(props) => props.theme.background.btn_access_hover};
    --text-access: ${(props) => props.theme.font.text_access};
    --text-access-hover: ${(props) => props.theme.font.text_access_hover};
    --text-login: ${(props) => props.theme.font.text_login};
    --btn-login: ${(props) => props.theme.background.btn_login};
    --btn-sideBar: ${(props) => props.theme.background.btn_sideBar};
    --btn-map: ${(props) => props.theme.background.btn_map};
    --btn-map-hover: ${(props) => props.theme.background.btn_map_hover};
  }
`;
