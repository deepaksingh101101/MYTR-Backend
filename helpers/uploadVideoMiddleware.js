import path, { parse } from 'path'

import { getDownloadURL, getStorage, ref ,uploadBytesResumable } from 'firebase/storage'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firbase.config.js';

export const uploadVideoMiddleware = async (file, quantity) => {
    const storageFB = getStorage();

    try {
        await signInWithEmailAndPassword(auth, "deepaksingh101101@gmail.com", "deepak");

        if (quantity === 'single') {
            const dateTime = Date.now();
            const fileName = `video/${dateTime}`;
            const storageRef = ref(storageFB, fileName);
            const metadata = {
                contentType: file.type,
            };

            // Initiate the upload task
            const uploadTask = uploadBytesResumable(storageRef, file.buffer, metadata);

            // Wait for the upload task to complete
            await uploadTask;

            // Once the upload is complete, get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            
            return downloadURL;
        }

        if (quantity === 'multiple') {
            for (let i = 0; i < file.images.length; i++) {
                const dateTime = Date.now();
                const fileName = `video/${dateTime}`;
                const storageRef = ref(storageFB, fileName);
                const metadata = {
                    contentType: file.images[i].mimetype,
                };

                const saveImage = await Image.create({ imageUrl: fileName });
                file.item.imageId.push({ _id: saveImage._id });
                await file.item.save();

                await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
            }
            return;
        }
    } catch (error) {
        console.error("Error uploading Video:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};
