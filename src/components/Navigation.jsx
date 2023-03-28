import {
  createStyles,
  Header,
  Group,
  Title,
  Avatar,
  Modal,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconUpload, IconLogout } from "@tabler/icons";
import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import UploadImage from "./UploadImage";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    position: "sticky",
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },
}));

export default function HeaderSearch() {
  const { classes } = useStyles();
  const { currentUser, logout } = useAuthContext();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Post a picture"
        sx={{ marginTop: 50 }}
      >
        <UploadImage />
      </Modal>

      <Header height={60} className={classes.header} mb={25}>
        <div className={classes.inner}>
          <Group>
            <Title component="a" href="/" order={1}>
              InstaKilo
            </Title>
          </Group>

          <Group>
            <Group ml="md" className={classes.links}>
              <Tooltip label="Post a picture" mt="xs">
                <ActionIcon>
                  <IconUpload onClick={() => setOpened(true)} size="md" />
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
                    navigate("/login");
                  }}
                  ml="xs"
                >
                  <IconLogout size="md" />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </div>
      </Header>
    </>
  );
}
