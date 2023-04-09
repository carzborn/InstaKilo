import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createStyles,
  Header,
  Title,
  Avatar,
  Modal,
  ActionIcon,
  Container,
  Tooltip,
  Group,
  Burger,
  Paper,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUpload, IconLogout, IconLogin } from "@tabler/icons";

import { useAuthContext } from "../contexts/AuthContext";
import UploadImage from "./UploadImage";
import Search from "./Search";

const useStyles = createStyles((theme) => ({
  root: {
    // paddingLeft: theme.spacing.md,
    // paddingRight: theme.spacing.md,
    position: "sticky",
  },

  dropdown: {
    display: "flex",
    flexDirection: "rowl",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    position: "absolute",
    width: "100%",
    top: 70,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "visable",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const NavV2 = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { currentUser, logout } = useAuthContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { classes } = useStyles();

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Post a picture"
        sx={{ marginTop: 50 }}
      >
        <UploadImage />
      </Modal>

      <Header height={70} className={classes.root}>
        <Container className={classes.header}>
          <Title component="a" href="/" order={1}>
            InstaKilo
          </Title>
          <Group spacing={5} className={classes.links}>
            {currentUser ? (
              <Group>
                <Search />

                <Tooltip label="Post a picture" mt="xs">
                  <ActionIcon>
                    <IconUpload onClick={() => setOpen(true)} size="md" />
                  </ActionIcon>
                </Tooltip>

                <>
                  {currentUser?.photoURL ? (
                    <Tooltip label="View your profile" mt="xs">
                      <Avatar
                        size="md"
                        component="a"
                        href="update-profile"
                        ml="xs"
                        radius="xl"
                        src={currentUser?.photoURL}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip label="View your profile" mt="xs">
                      <Avatar
                        size="md"
                        component="a"
                        href="/update-profile"
                        ml="xs"
                        radius="xl"
                        color="blue"
                      ></Avatar>
                    </Tooltip>
                  )}
                </>

                <Tooltip label="Logout" mt="xs">
                  <ActionIcon
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    ml="xs"
                  >
                    <IconLogout size="md" />
                  </ActionIcon>
                </Tooltip>
              </Group>
            ) : (
              <Tooltip label="Login" mt="xs">
                <ActionIcon onClick={() => navigate("/login")}>
                  <IconLogin size="xl" />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />

          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {currentUser ? (
                  <>
                    <Search />

                    <Tooltip label="Post a picture" mt="xs">
                      <ActionIcon size="sm">
                        <IconUpload onClick={() => setOpen(true)} />
                      </ActionIcon>
                    </Tooltip>

                    {currentUser?.photoURL ? (
                      <Tooltip label="View your profile" mt="xs">
                        <Avatar
                          size="sm"
                          component="a"
                          href="update-profile"
                          ml="xs"
                          radius="xl"
                          src={currentUser?.photoURL}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip label="View your profile" mt="xs">
                        <Avatar
                          size="sm"
                          component="a"
                          href="/update-profile"
                          ml="xs"
                          radius="xl"
                          color="blue"
                        ></Avatar>
                      </Tooltip>
                    )}

                    <Tooltip label="Logout" mt="xs" size="sm">
                      <ActionIcon
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        ml="xs"
                      >
                        <IconLogout />
                      </ActionIcon>
                    </Tooltip>
                  </>
                ) : (
                  <Tooltip label="Login" mt="xs">
                    <ActionIcon
                      onClick={() => {
                        navigate("/login");
                      }}
                      size="md"
                    >
                      <IconLogin />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>
    </>
  );
};
export default NavV2;
