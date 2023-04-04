import Post from "../components/Post";
import { useState, useEffect } from "react";

import { db } from "../firebase/index";
import { query, onSnapshot, orderBy, collection } from "firebase/firestore";

import HeaderSearch from "../components/Navigation";
import { useAuthContext } from "../contexts/AuthContext";
import Grid from "../components/ImageGrid";
import { SimpleGrid } from "@mantine/core";

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
      <HeaderSearch />

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
        <SimpleGrid cols={3}>
          {posts.map(({ id, post }) => (
            <Grid
              key={id}
              username={post.username}
              imageUrl={post.imageUrl}
              profilePic={post.profilePic}
              postId={id}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default HomePage;
