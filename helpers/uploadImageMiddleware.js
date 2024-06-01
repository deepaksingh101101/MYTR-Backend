import path, { parse } from 'path'

import { getDownloadURL, getStorage, ref ,uploadBytesResumable } from 'firebase/storage'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firbase.config.js';

export const uploadImageMiddleware = async (files, quantity) => {
    const storageFB = getStorage();
    const urls=[];

    try {
        await signInWithEmailAndPassword(auth, "deepaksingh101101@gmail.com", "deepak");

        if (quantity === 'single') {
            const dateTime = Date.now();
            const fileName = `images/${dateTime}`;
            const storageRef = ref(storageFB, fileName);
            const metadata = {
                contentType: files.type,
            };

            // Initiate the upload task
            const uploadTask = uploadBytesResumable(storageRef, files.buffer, metadata);

            // Wait for the upload task to complete
            await uploadTask;

            // Once the upload is complete, get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            urls.push(downloadURL);
        }

        else if (quantity === 'multiple') {
            for (let i = 0; i < files.length; i++) {
                const dateTime = Date.now();
                const fileName = `images/${dateTime}_${files[i].originalname}`;
                const storageRef = ref(storageFB, fileName);
                const metadata = {
                    contentType: files[i].mimetype,
                };

                const uploadTask = uploadBytesResumable(storageRef, files[i].buffer, metadata);
                await uploadTask;
        
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                urls.push(downloadURL);
            }
            return urls;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};
