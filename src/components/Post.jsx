import React, { useEffect, useState } from "react";

import { db, storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

import {
  Card,
  Image,
  Text,
  Group,
  Container,
  Avatar,
  TextInput,
  ScrollArea,
  Divider,
  ActionIcon,
} from "@mantine/core";
import { IconMessageShare, IconTrash } from "@tabler/icons";
import ModalImage from "react-modal-image";
import { useAuthContext } from "../contexts/AuthContext";

const Post = ({
  username,
  caption,
  imageUrl,
  profilePic,
  postId,
  user,
  path,
}) => {
  const { currentUser } = useAuthContext();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // specific post everytime its updated
  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          comment: doc.data(),
        }))
      );
    });
  }, [postId]);

  // Add a comment to a post
  const postComment = (e) => {
    e.preventDefault();

    const docRef = doc(db, "posts", postId);
    const colRef = collection(docRef, "comments");
    addDoc(colRef, {
      text: comment,
      name: currentUser.displayName,
      timestamp: serverTimestamp(),
      uid: currentUser.uid,
    });
    setComment("");
  };

  //   Delete post
  const deletePost = async () => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    const dbRef = doc(db, "posts", postId);
    await deleteDoc(dbRef);
  };

  const deleteComment = async () => {
    const docRef = doc(db, "posts", postId, "comments", comments[0].id);
    console.log(docRef);
    await deleteDoc(docRef);
  };

  return (
    <Container fluid="fluid" align="center" mt="xl" mb="xl">
      <Card
        shadow="md"
        radius="sm"
        sx={{
          maxWidth: 500,
        }}
      >
        <Card.Section p={10} align="start">
          <Group position="apart">
            <Text
              weight={500}
              size="sm"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Avatar radius="xl" src={profilePic} color="blue" mr="md" />
              <strong>{username}</strong>
            </Text>
            {user === currentUser.uid && (
              <ActionIcon onClick={() => deletePost()}>
                <IconTrash />
              </ActionIcon>
            )}
          </Group>
        </Card.Section>

        <Card.Section>
          <ModalImage
            small={imageUrl}
            large={imageUrl}
            imageBackgroundColor="white"
            hideDownload
          />
        </Card.Section>

        <Card.Section mt="md" align="start">
          <Text align="left" ml="md" mb="xs">
            <strong>{username} </strong>
            {caption}
          </Text>

          <Divider />

          <Group ml="md">
            <ScrollArea.Autosize
              maxHeight={100}
              offsetScrollbars="offsetScrollbars"
              type="never"
              mt="xs"
              sx={{ width: "100%" }}
            >
              {comments.map(({ id, comment }) => (
                <Group key={id} position="apart">
                  <Text size="sm" mb="xs">
                    <strong> {comment?.name} </strong>
                    {comment?.text}
                  </Text>

                  {currentUser && comment.uid === currentUser.uid ? (
                    <ActionIcon
                      size="xs"
                      onClick={() => deleteComment(comment.uid)}
                    >
                      <IconTrash />
                    </ActionIcon>
                  ) : currentUser && user === currentUser.uid ? (
                    <ActionIcon
                      size="xs"
                      onClick={() => deleteComment(comment.uid)}
                    >
                      <IconTrash />
                    </ActionIcon>
                  ) : null}
                </Group>
              ))}
            </ScrollArea.Autosize>
          </Group>

          <form onSubmit={postComment}>
            <TextInput
              width="100%"
              placeholder="Add comment..."
              variant="unstyled"
              radius={0}
              pl="md"
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
              mt="xs"
              rightSection={
                <ActionIcon
                  onClick={postComment}
                  disabled={!comment}
                  mr="xs"
                  variant="filled"
                  color="blue"
                >
                  {" "}
                  <IconMessageShare />
                </ActionIcon>
              }
            />
          </form>
        </Card.Section>
      </Card>
    </Container>
  );
};

export default Post;
