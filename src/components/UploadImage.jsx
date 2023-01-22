import { FileInput, TextInput, Button, Group, Loader } from "@mantine/core"
import { useState } from "react"
import { auth, db, storage } from "../firebase/index"
import { ref, getDownloadURL, uploadBytes} from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useAuthContext } from "../contexts/AuthContext";

const UploadImage = () => {
    const [caption, setCaption] = useState('')
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(false);

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
    const handleUpload = async () => {

            setLoading(true)
            const fileRef = ref(storage, `posts/${image.name}`)
            const uploadResult = await uploadBytes(fileRef, image)
            const imageUrl = await getDownloadURL(uploadResult.ref)
            try{
                await addDoc(collection(db, 'posts'), {
                    timestamp: serverTimestamp(),
                    caption: caption,
                    imageUrl: imageUrl,
                    username:auth.currentUser.displayName,
                    profilePic: auth.currentUser.photoURL
                })
                setLoading(false)
            } catch(err){
                console.log(err.message);
            }
    }

    return (
        <>
            <TextInput
                label='Enter a caption'
                withAsterisk 
                placeholder="Enter caption" 
                variant="filled"
                value={caption}
                onChange={(e) => setCaption(e.currentTarget.value)}
            />
            <FileInput
                label='Choose picture to post'
                withAsterisk 
                placeholder="Choose picture" 
                mt='xs' 
                variant="filled"
                accept="image/png,image/jpeg"
                type="file"
                onChange={handleFileChange}
            />
            <Group position="center">
                {
                    loading 
                        ? <Loader variant="bars" size='md' mt='md'/> 
                        :   <Button 
                                onClick={handleUpload}
                                mt='md'
                                sx={{
                                    width: '50%',
                                }} 
                            >
                                Post
                        </Button>
                }
            </Group>
        </>
    )
}

export default UploadImage