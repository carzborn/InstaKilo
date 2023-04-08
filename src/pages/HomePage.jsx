import { useState, useEffect } from "react";

import { db } from "../firebase/index";
import { query, onSnapshot, orderBy, collection } from "firebase/firestore";

import { useAuthContext } from "../contexts/AuthContext";
import Grid from "../components/ImageGrid";
import Post from "../components/Post";
import { Container, SimpleGrid, Title } from "@mantine/core";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuthContext();

  // Get snapshot for all posts
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <>
      {currentUser ? (
        <>
          {
            // map out all posts
            posts.map(({ id, post }) => (
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
            ))
          }
        </>
      ) : (
        <>
          <Container fluid m="lg">
            <Title align="center" mb="xl">
              Latest Posts
            </Title>
            <SimpleGrid
              cols={5}
              spacing="xs"
              breakpoints={[
                { maxWidth: "md", cols: 3, spacing: "md" },
                { maxWidth: "sm", cols: 2, spacing: "sm" },
                { maxWidth: "xs", cols: 1, spacing: "sm" },
              ]}
            >
              {posts.map(({ id, post }) => (
                <Grid key={id} imageUrl={post.imageUrl} />
              ))}
            </SimpleGrid>
          </Container>
        </>
      )}
    </>
  );
};

export default HomePage;
