import {useRef, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
// import { Card, Form } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";

import {
    TextInput,
    FileInput,
    Button,
    Group,
    Box,
    Paper,
    PasswordInput,
    Container,
    Center,
    Card,
    Title,
    ThemeIcon,
    Notification,
    Divider,
    Text
} from '@mantine/core';
import {IconUserCircle, IconX} from '@tabler/icons'
import {useForm} from '@mantine/form';

const RegisterPage = () => {
    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [image, setImage] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {signup} = useAuthContext();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        console.log(e);

        if (!e) {
            setImage(null);
            return;
        }

        setImage(e);
        console.log("File changed!", e);
    };

    const handleSubmit = async () => {

        //checks for matching passwords
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("The passwords does not match");
        }

        setError(null);
        try {
            setLoading(true);
            await signup(
                emailRef.current.value,
                passwordRef.current.value,
                displayNameRef.current.value,
                image
            );

            navigate("/");

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.log(err);
        }
    };

    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },

        validate: {
            email: (value) => (
                /^\S+@\S+$/.test(value)
                    ? null
                    : 'Invalid email'
            ),
            username: (value) => (
                value.length < 3
                    ? 'Username must include at least 3 letters'
                    : null
            )
        }
    });

    return (
        <Container className='flex align-items-center'>
            
            {
                loading && (
                    <div className="text-center">
                        <BeatLoader/>
                    </div>
                )
            }

            <Card
                sx={{
                    maxWidth: 400
                }}
                shadow='md'
                mx="auto"
                mt='xl'>
                <Card.Section align='center'>
                    <Title m='md' order={1}>InstaKilo</Title>
                </Card.Section>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        withAsterisk="withAsterisk"
                        label="Email"
                        placeholder="your@email.com"
                        ref={emailRef}
                        type='email'
                        {...form.getInputProps('email')}/>

                    <TextInput
                        withAsterisk="withAsterisk"
                        label="Username"
                        placeholder="Username"
                        ref={displayNameRef}
                        type='text'
                        {...form.getInputProps('username')}/>

                    <FileInput
                        withAsterisk="withAsterisk"
                        label='Profile Picture'
                        placeholder="Choose a Picture"
                        type="file"
                        onChange={handleFileChange}/>

                    <PasswordInput
                        withAsterisk="withAsterisk"
                        label="Password"
                        placeholder="Password"
                        ref={passwordRef}
                        {...form.getInputProps('password')}/>

                    <PasswordInput
                        withAsterisk="withAsterisk"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        ref={passwordConfirmRef}
                        {...form.getInputProps('confirmPassword')}/> {
                        error && (
                            <Notification
                                icon={<IconX size = {
                                    18
                                } />}>
                                Something went wrong! Please try again.
                            </Notification>
                        )
                    }

                    <Group position="center" mt="md">
                        <Button fullWidth={true} type="submit">Register</Button>
                    </Group>

                    <Divider/>

                    <Text mt='md' align="center">
                        Already have an account?
                        <Text ml={5} span="span" component="a" href="/login" underline="underline">
                            Login here
                        </Text>
                    </Text>

                </form>
            </Card>

        </Container>
    );
};

export default RegisterPage;

{/* <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id="displayName" className="mb-3">
                            <Form.Label>Namn</Form.Label>
                            <Form.Control type="text" ref={displayNameRef} required />
                        </Form.Group>

                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="photo" className="mb-3">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>

                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        {error && (
                            <div>
                                <span>{error}</span>
                            </div>
			    	    )}

                        <button>
                            Create Account
						</button>
                    </Form>
                </Card.Body>
            </Card>

            <div>
                <Link to="/login">Log in instead?</Link>
            </div> */
}

// import { useRef, useState } from "react"; import { useAuthContext } from
// "../contexts/AuthContext"; import { Link, useNavigate } from
// "react-router-dom"; import BeatLoader from "react-spinners/BeatLoader";
// import { TextField, Button, Container, Box, Card, Avatar, Typography, Grid,
// CssBaseline } from '@material-ui/core'; import AppRegistrationIcon from
// '@mui/icons-material/AppRegistration'; import { textAlign } from
// "@mui/system"; const SignUp = () => {     const displayNameRef = useRef()
// const emailRef = useRef()     const passwordRef = useRef()     const
// passwordConfirmRef = useRef() 	const [image, setImage] = useState(false);
// const [error, setError] = useState(null); 	const [loading, setLoading] =
// useState(false); 	const { signup } = useAuthContext(); 	const navigate =
// useNavigate();     const handleFileChange = (e) => {         if
// (!e.target.files[0]){             setImage(null)             return; }
// setImage(e.target.files[0])         console.log('File changed:',
// e.target.files[0]);     }     const handleSubmit = async (e) => {
// e.preventDefault(); 	 checks for matching passwords 		if
// (passwordRef.current.value !== passwordConfirmRef.current.value) { 			return
// setError("The passwords does not match"); 		} 		setError(null); 		try {
// setLoading(true); 			await signup( 				emailRef.current.value,
// passwordRef.current.value, 				displayNameRef.current.value, 				image 			);
// navigate("/"); 			setLoading(false); 		} catch (err) { setError(err.message);
// setLoading(false); 			console.log(err); 		} 	}; return (         <>
// {loading && (                 <BeatLoader color='white'
// size={10}                 />             )} <Container component='main'
// maxWidth='xs'>                     <CssBaseline/> <Card variant="outlined"
// raised>                         <Avatar> <AppRegistrationIcon/>
// </Avatar> <Typography component='h1' variant='h5'>
// Sign Up </Typography>                         <form onSubmit={handleSubmit}>
// <Grid container spacing={2}>                                 <Grid item
// xs={12}>                                     <TextField required
// id="displayName" label="Username"
// type='text' ref={displayNameRef}                                     />
// </Grid>                                 <Grid item xs={12}> <TextField
// required id="email"                                         label="Email"
// type='email'                                         ref={emailRef} />
// </Grid> <Grid item xs={12}>                                     <TextField
// required                                         id="password"
// label="Password"                                         type='password'
// ref={passwordRef}                                     /> </Grid>
// <Grid item xs={12}> <TextField
// required variant="outlined"
// id="password" label="Confirm Password" type='password'
// ref={passwordConfirmRef}                                     /> </Grid>
// </Grid> <Button                                 type="submit"
// variant="contained"                                 color="primary" >
// Sign Up </Button>                         </form>                     </Card>
// </Container>         </>     ) } export default SignUp