import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../contexts/AuthContext";

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

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {login} = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (err) {
            setError(err.message);
            setLoading(false);
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
        <Container>
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

                    <PasswordInput
                        withAsterisk="withAsterisk"
                        label="Password"
                        placeholder="Password"
                        ref={passwordRef}
                        {...form.getInputProps('password')}/> 
                        
                        {error && (
                            <Notification
                                icon={<IconX size = {
                                    18
                                } />}>
                                Something went wrong! Please try again.
                            </Notification>
                        )
                    }

                    <Group position="center" mt="md">
                        <Button fullWidth={true} type="submit">Login</Button>
                    </Group>

                    <Divider/>

                    <Text mt='md' align="center">
                        Don't have an account?
                        <Text ml={5} span="span" component="a" href="/" underline="underline">
                            Register here
                        </Text>
                    </Text>

                </form>
            </Card>

        </Container>
    );
};

export default Login;