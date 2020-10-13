import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: #fff;
    background: #ebf2f5;
  }

  body, input, button, textarea {
    font: 600 18px Nunito, sans-serif;
  }

  :root {
    --bg-primary: ${props => props.theme.background.primary};
    --bg-secondary: ${props => props.theme.background.secondary};
    --bg-linear-primary: ${props => props.theme.background.linear_primary};
    --bg-linear-secondary: ${props => props.theme.background.linear_secondary};
    --bg-button: ${props => props.theme.background.button};
    --bg-button_hover: ${props => props.theme.background.button_hover};
    --bg-button_hover_light: ${props => props.theme.background.button_hover_light};
  }
`;