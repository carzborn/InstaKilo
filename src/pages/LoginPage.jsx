import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

import {
  TextInput,
  Button,
  Group,
  PasswordInput,
  Container,
  Card,
  Title,
  Notification,
  Divider,
  Text,
  Loader,
  CardSection,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useForm } from "@mantine/form";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
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
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) =>
        value.length < 3 ? "Username must include at least 3 letters" : null,
    },
  });

  return (
    <Container fluid>
      <Card
        sx={{
          maxWidth: 400,
        }}
        shadow="md"
        mx="auto"
        mt="xl"
      >
        <Card.Section align="center">
          <Title m="md" order={1}>
            InstaKilo
          </Title>
        </Card.Section>

        <form onSubmit={handleSubmit}>
          <TextInput
            withAsterisk="withAsterisk"
            label="Email"
            placeholder="your@email.com"
            ref={emailRef}
            type="email"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            withAsterisk="withAsterisk"
            label="Password"
            placeholder="Password"
            ref={passwordRef}
            {...form.getInputProps("password")}
          />

          {error && (
            <Notification icon={<IconX size={18} />}>
              Something went wrong! Please try again.
            </Notification>
          )}

          <CardSection align="center">
            {loading ? (
              <Loader variant="bars" size="md" mt="md" />
            ) : (
              <Group position="center" mt="md">
                <Button sx={{ width: "50%" }} type="submit">
                  Login
                </Button>
              </Group>
            )}
          </CardSection>

          <Divider />
          <Text mt="md" align="center">
            Don't have an account?
            <Text
              ml={5}
              span="span"
              component="a"
              href="/register"
              underline="underline"
            >
              Register here
            </Text>
          </Text>
        </form>
      </Card>
    </Container>
  );
};

export default LoginPage;
