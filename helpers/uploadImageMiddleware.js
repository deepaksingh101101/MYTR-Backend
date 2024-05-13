import path, { parse } from 'path'

import { getStorage, ref ,uploadBytesResumable } from 'firebase/storage'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firbase.config.js';

export const uploadImageMiddleware = async (file, quantity) => {
    const storageFB = getStorage();

    try {
        await signInWithEmailAndPassword(auth, "deepaksingh101101@gmail.com", "deepak");

        if (quantity === 'single') {
            const dateTime = Date.now();
            const fileName = `images/${dateTime}`;
            const storageRef = ref(storageFB, fileName);
            const metadata = {
                contentType: file.type,
            };
            await uploadBytesResumable(storageRef, file.buffer, metadata);
            return fileName;
        }

        if (quantity === 'multiple') {
            for (let i = 0; i < file.images.length; i++) {
                const dateTime = Date.now();
                const fileName = `images/${dateTime}`;
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
        console.error("Error uploading image:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};
