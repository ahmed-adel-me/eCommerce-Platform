import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import Resizer from "react-image-file-resizer";

// Resize function to resize image before upload
const resizeImage = (file) => {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file, // File to resize
      800, // Max width
      800, // Max height
      "JPEG", // Compress format (JPEG, PNG, etc.)
      80, // Quality (0 to 100)
      0, // No rotation (set 90 for rotation if needed)
      (uri) => resolve(uri), // Callback to return the resized image URI
      "base64" // Output type (you can change it to 'blob' if needed)
    );
  });
};

// Upload resized images to Firebase
export default async function uploadImages(files) {
  const uploadPromises = Array.from(files).map(async (file) => {
    try {
      // Resize the image before uploading
      const resizedImage = await resizeImage(file);

      // Convert base64 to Blob
      const byteString = atob(resizedImage.split(",")[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uintArray], { type: "image/jpeg" });

      // Create a reference for the resized image in Firebase
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      // Return a promise for upload and download URL
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      return Promise.reject(error);
    }
  });

  return Promise.all(uploadPromises);
}
