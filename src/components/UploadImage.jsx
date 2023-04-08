import { useState } from "react";

import { db, storage } from "../firebase/index";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { FileInput, TextInput, Button, Group, Loader } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../contexts/AuthContext";

const UploadImage = () => {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);

  const { currentUser } = useAuthContext();

  const handleFileChange = (e) => {
    console.log(e);

    if (!e) {
      setImage(null);
      return;
    }

    setImage(e);
    console.log("File changed!", e);
  };

  // Upload a post to the posts collection
  const handleUpload = async (data) => {
    setLoading(true);

    try {
      const uuid = uuidv4();
      const filename = `${uuid},jpg`;
      const fileRef = ref(storage, `posts/${filename}`);
      const uploadResult = await uploadBytes(fileRef, image);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, "posts"), {
        timestamp: serverTimestamp(),
        caption: caption,
        imageUrl: imageUrl,
        path: fileRef.fullPath,
        username: currentUser.displayName,
        profilePic: currentUser.photoURL,
        user: currentUser.uid,
      });
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <TextInput
        label="Enter a caption"
        withAsterisk
        placeholder="Enter caption"
        variant="filled"
        value={caption}
        onChange={(e) => setCaption(e.currentTarget.value)}
      />
      <FileInput
        label="Choose picture to post"
        withAsterisk
        placeholder="Choose picture"
        mt="xs"
        variant="filled"
        accept="image/png,image/jpeg"
        type="file"
        onChange={handleFileChange}
      />
      <Group position="center">
        {loading ? (
          <Loader variant="bars" size="md" mt="md" />
        ) : (
          <Button
            type="submit"
            onClick={handleUpload}
            mt="md"
            sx={{
              width: "50%",
            }}
          >
            Post
          </Button>
        )}
      </Group>
    </>
  );
};

export default UploadImage;
