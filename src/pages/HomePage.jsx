import Post from "../components/Post"
import HeaderSearch from "../components/Navigation"
import { useState, useEffect } from "react"
import { db } from "../firebase/index"
import { doc, query, onSnapshot, orderBy, collection } from "firebase/firestore";

const HomePage = () => {
    const [posts, setPosts] = useState([])

    // Get snapshot for all posts
    useEffect( () => {

        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
        onSnapshot(q, (snapshot) =>{
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
                
            })))
            
        })
    }, [])

    return(
        <>
            <HeaderSearch/>
            {
                // map out all posts
                posts.map(({id, post}) => (
                    <Post 
                        key={id} 
                        username={post.username} 
                        caption={post.caption} 
                        imageUrl={post.imageUrl} 
                        profilePic={post.profilePic}
                        postId={id}
                    />
                ))
            }
        </>
    )
}

export default HomePage