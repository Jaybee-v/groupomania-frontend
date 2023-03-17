import { createGlobalStyle } from "styled-components"

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    :root{
        --color-primary:#FD2D01;
        --color-secondary:#FFD7D7;
        --color-third:#4E5166;
    }
    li {
        list-style: none;
    }

    body {
        background-color: var(--color-primary);
        color: var(--color-third);
        margin: 0;
    }
`

function GlobalStyle() {
    // const { theme } = useContext(ThemeContext)
    return <StyledGlobalStyle />
}

export default GlobalStyle
