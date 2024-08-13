import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
    },
    typography: {
        fontFamily: ['Poppins'].join(',')
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        padding: '10px 12px',
                        color: '10px 26px 10px 12px',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        border: '1px solid rgb(206, 212, 218)',
                        outline: 'none',
                    },
                    '& .MuiInputBase-formControl': {
                        width: '100%',
                    },
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'black',
                    width: 'fit-content',
                },
                asterisk: {
                    color: 'red',
                }
            },
        },
    }
})

export default theme;