import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light'
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontSize: '2rem',
            fontWeight: 'bold',
            padding: '0.8rem 0',
          },
        },
        {
          props: { variant: 'h2' },
          style: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            padding: '0.6rem 0',
          },
        },
        {
          props: { variant: 'h3' },
          style: {
            fontSize: '1.1rem',
            fontWeight: 'bold',
            padding: '0.4rem 0',
          },
        },
        {
          props: { variant: 'body1' },
          style: {
            fontSize: '1rem',
            padding: '0.2rem 0',
          },
        },
        {
          props: { variant: 'body2' },
          style: {
            fontSize: '0.875rem',
            padding: '0.2rem 0',
          },
        },
      ],
    },
  },
}

export const theme = createTheme(themeOptions)
