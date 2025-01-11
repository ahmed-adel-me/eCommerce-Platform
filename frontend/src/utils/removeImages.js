import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

export default async function removeImages(urls) {
  const removePromises = urls.map((url) => {
    // Create a reference to the file using the URL
    if (!url || !url.includes("/o/") || url.includes("?alt=")) return;

    const storageRef = ref(
      storage,
      decodeURIComponent(url.split("/o/")[1].split("?alt=")[0])
    );

    return new Promise((resolve, reject) => {
      deleteObject(storageRef)
        .then(() => resolve(url)) // Resolve with the URL of the deleted file
        .catch((error) => reject(error));
    });
  });

  return Promise.all(removePromises);
}
