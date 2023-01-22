import { useRef, useState } from "react";
import { Card, Image, CardSection, Container, FileInput, PasswordInput, TextInput, Button, Loader, Center, } from '@mantine/core';
import {useForm} from '@mantine/form';
import { useAuthContext } from "../contexts/AuthContext";
import { Form } from "react-router-dom";

const UpdateProfile = () => {
	const displayNameRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [image, setImage] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

	const {
		currentUser,
		reloadUser,
		updateDisplayNameAndPhoto,
		updateUserPassword,
	} = useAuthContext();

	const handleFileChange = (e) => {
        console.log(e);
        if (!e) {
            setImage(null);
            return;
        }

        setImage(e);
        console.log("File changed!", e);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match");
		}


		//checks for matching password and required length before updating the password
		if(passwordRef.current.value === passwordConfirmRef.current.value && passwordRef.current.value.length >= 6) {
			updateUserPassword(passwordConfirmRef.current.value)
			setSuccess(true)
		}

		setError(null);


		try {
            setLoading(true)
			if (displayNameRef.current.value !== currentUser.displayName || image) {
				await updateDisplayNameAndPhoto(displayNameRef.current.value, image);
			}
			await reloadUser();
            setLoading(false)
		} catch (e) {
			setError(e.message);
		}
	};

	return (

            <Card
                sx={{
                    maxWidth: 400
                }}
                shadow='md'
                mx="auto"
                mt='xl'
            >
				
					<Image
						src={currentUser.photoURL}
						alt="profile-image"
                        withPlaceholder
                        height={350}
					/>


				<form onSubmit={handleSubmit}>
                    <TextInput
                        label='Username'
                        ref={displayNameRef}
                        defaultValue={currentUser.displayName}
                    />

                    <PasswordInput
                        label='Password'
                        ref={passwordRef}
                    />

                    <PasswordInput
                        label='Confirm Password'
                        ref={passwordConfirmRef}
                    />

                    <FileInput
                        label='Profile Picture'
                        placeholder="Choose a picture"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                    />

					{error && (
						<div>
							<span>{error}</span>
						</div>
					)}

				

					{success && (
						<p>PASSWORD UPDATED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
					)}
                    
                    <Center>
                    {
                        loading ? <Loader variant='bars' mt='md'/> : 
                        <Button type='submit' fullWidth mt='md'>
                            Update profile
                        </Button>
                    }
                    </Center>


				</form>
		</Card>
	);
};

export default UpdateProfile;