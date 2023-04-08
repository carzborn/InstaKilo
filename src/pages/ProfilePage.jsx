import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase/index";
import { query, getDocs, orderBy, collection, where } from "firebase/firestore";

import {
  Avatar,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Title,
} from "@mantine/core";
import Post from "../components/Post";

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  const params = useParams();

  // Get snapshot for all posts
  useEffect(() => {
    const getPosts = async () => {
      const q = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc"),
        where("username", "==", params.id)
      );
      const querySnapshot = await getDocs(q);
      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    };

    const getUser = async () => {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", params.id)
      );
      const querySnapshot = await getDocs(q);
      setUser(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data(),
        }))
      );
    };
    getUser();
    getPosts();
  }, [params]);

  return (
    <Container fluid m="xl">
      <>
        {user.map(({ id, user }) => (
          <>
            <Group key={id} position="center">
              <Avatar src={user.photoURL} radius={100} size={150} mr="xl" />
              <Title align="center">{user.displayName}</Title>
            </Group>
            <Divider mt="xl" mb="xl" />
          </>
        ))}

        <SimpleGrid
          cols={3}
          spacing="xs"
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              profilePic={post.profilePic}
              postId={id}
              user={post.user}
              path={post.path}
            />
          ))}
        </SimpleGrid>
      </>
    </Container>
  );
};

export default ProfilePage;
