import { Typography, Box, TextField, Button, FormControl, CircularProgress } from "@mui/material"
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const LoginPage = () => {

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const loginAction = (data) => {
        console.log(data);
        //logic here
    }

    return (
        <Box borderRadius={'xl'} boxShadow={"rgba(0, 0, 0, 0.1) 0px 2px 10px 0px"} bgcolor={"white"} p={{
            xs: "50px 30px",
            sm: "50px 75px"
        }}>
            <Typography variant={'h5'} component='h1' p={4} pt={0} pb={2} fontWeight={500}>Se connecter</Typography>
            <form className="flex flex-col mt-5 gap-5" onSubmit={handleSubmit(loginAction)}>
                <FormControl>
                    <TextField
                        type="email"
                        fullWidth
                        required={false}
                        placeholder="Entrer l'adresse e-mail"
                        {
                            ...register('email', {
                                required: 'Ce champ est requis',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                    message: 'Adresse e-mail invalide'
                                }
                            })
                        }
                    />
                    {
                        errors?.email && <p className="text-red-500 text-sm text-left mt-2">{errors?.email.message}</p>
                    }
                </FormControl>
                <FormControl sx={{position: "relative"}}>
                    <TextField
                        placeholder="Entrez votre mot de passe"
                        InputProps={{
                            type: isPasswordVisible ? 'text' : 'password'
                        }}
                        fullWidth
                        required={false}
                        {
                            ...register('password', {
                                required: 'Mot de passe est requis',
                            })
                        }
                    />
                    <Button onClick={() => setIsPasswordVisible((prev) => !prev)} className="w-5 h-11 right-0 absolute">
                        {
                            !!isPasswordVisible ? <VisibilityIcon color="action"  /> : <VisibilityOffIcon color="action" />
                        }
                    </Button>
                    {
                        errors?.password && <p className="text-red-500 text-sm text-left mt-2">{errors?.password.message}</p>
                    }
                </FormControl>
                <Box>
                    <Button
                        style={{
                            padding: '10px 26px',
                            textTransform: "capitalize"
                        }}
                        variant="contained"
                        fullWidth
                        type="submit"
                        className="text-base font-bold"
                    >
                        {isLoading ? <CircularProgress color="inherit" size="1.4rem" /> : "Se connecter"}
                    </Button>
                </Box>
                <Box className="flex flex-col sm:flex-row items-center flex-wrap gap-3 justify-center sm:justify-start no-underline text-primary">
                    <Link className="hover:underline" to='/auth/register'>
                    Vous n'avez pas de compte?
                    </Link>
                </Box>
            </form>
        </Box>
    )
}

export default LoginPage