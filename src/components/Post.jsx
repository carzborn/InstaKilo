import React, {useEffect, useState} from 'react';
import {IconMessageShare} from '@tabler/icons';
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
    ActionIcon
} from '@mantine/core';
import {useAuthContext} from '../contexts/AuthContext';
import {db} from '../firebase';
import {addDoc, collection, onSnapshot, doc, serverTimestamp, query, orderBy} from 'firebase/firestore';

const Post = ({username, caption, imageUrl, profilePic, postId}) => {
    const {currentUser} = useAuthContext()
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    // Get a update on comments on a specific post everytime its updated 
    useEffect(() => {
        const q = query(collection(db, 'posts', postId, 'comments'), orderBy('timestamp', 'desc'))
        onSnapshot(q, (snapshot) => {
            setComments(snapshot.docs.map(doc => (doc.data())))
        })
    }, [postId])

    // Add a comment to a post
    const postComment = (e) => {
        e.preventDefault()

        const docRef = doc(db, 'posts', postId)
        const colRef = collection(docRef, 'comments')
        addDoc(colRef, {
            text: comment,
            name: currentUser.displayName,
            timestamp: serverTimestamp()
        })
        setComment('')
    }

    return (
        <Container fluid="fluid" align='center' mt='xl' mb='xl'>
            <Card
                shadow='md'
                radius='sm'
                sx={{
                    maxWidth: 500
                }}>

                <Card.Section p={10} align='start'>
                    <Group position='left'>
                        <Avatar radius="xl" src={profilePic} color='blue'/>
                        <Text weight={500} size='sm'>
                            <strong>{username}</strong>
                        </Text>
                    </Group>
                </Card.Section>

                <Card.Section >
                    <Image
                        src={imageUrl}
                        alt='An InstaKilo post!'
                        fit='contain'
                        width='100%'
                        withPlaceholder="withPlaceholder"/>
                </Card.Section>

                <Card.Section mt="md" align='start'>
                    <Text
                        align='left'
                        ml='md'
                        mb='xs'
                    >
                        <strong>{username}
                        </strong> {caption}
                    </Text>

                    <Divider/>

                    <Group ml='md'>
                        <ScrollArea.Autosize
                            maxHeight={100}
                            offsetScrollbars="offsetScrollbars"
                            scrollHideDelay={500}
                            mt='xs'
                        >
                            {
                                comments
                                    ?.map((comment) => (
                                        <Text size='sm'>
                                            <strong>{comment?.name} </strong>{comment?.text}
                                        </Text>
                                    ))
                            }
                        </ScrollArea.Autosize>
                    </Group>

                    <form onSubmit={postComment}>
                        <TextInput
                            width='100%'
                            placeholder="Add comment..."
                            variant="unstyled"
                            radius={0}
                            pl='md'
                            value={comment}
                            onChange={(e) => setComment(e.currentTarget.value)}
                            mt='xs'
                            rightSection={<ActionIcon
                            onClick = {
                                postComment
                            }
                            disabled = {
                                !comment
                            }
                            mr = 'xs'
                            variant = 'filled' 
                            color='blue'
                        > 
                            <IconMessageShare />
                        </ActionIcon>
                            }
                        />
                    </form>
                </Card.Section>
            </Card>
        </Container>
    )
}

export default Post