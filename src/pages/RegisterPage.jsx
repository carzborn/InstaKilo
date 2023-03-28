import { useRef, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  TextInput,
  FileInput,
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
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useForm } from "@mantine/form";

const RegisterPage = () => {
  const displayNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [image, setImage] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthContext();
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
    <Container className="flex align-items-center">
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

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk="withAsterisk"
            label="Email"
            placeholder="your@email.com"
            ref={emailRef}
            type="email"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk="withAsterisk"
            label="Username"
            placeholder="Username"
            ref={displayNameRef}
            type="text"
            {...form.getInputProps("username")}
          />
          <FileInput
            withAsterisk="withAsterisk"
            label="Profile Picture"
            placeholder="Choose a Picture"
            type="file"
            onChange={handleFileChange}
          />
          <PasswordInput
            withAsterisk="withAsterisk"
            label="Password"
            placeholder="Password"
            ref={passwordRef}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            withAsterisk="withAsterisk"
            label="Confirm Password"
            placeholder="Confirm Password"
            ref={passwordConfirmRef}
            {...form.getInputProps("confirmPassword")}
          />{" "}
          {error && (
            <Notification icon={<IconX size={18} />}>
              Something went wrong! Please try again.
            </Notification>
          )}
          <Group position="center" mt="md">
            {loading ? (
              <Loader mt="md" variant="bars" />
            ) : (
              <Button fullWidth={true} type="submit">
                Register
              </Button>
            )}
          </Group>
          <Divider />
          <Text mt="md" align="center">
            Already have an account?
            <Text
              ml={5}
              span="span"
              component="a"
              href="/login"
              underline="underline"
            >
              Login here
            </Text>
          </Text>
        </form>
      </Card>
    </Container>
  );
};

export default RegisterPage;
