import { api } from "@/libs/axios";
import { FileUpload } from "@/types/file";

export const uploadFile = async (
    image: File | null, 
    setImagesInfo: React.Dispatch<React.SetStateAction<FileUpload | null>>
) => {
    const formData = new FormData();
    formData.append("file", image!);

    try {
        await api.post('/file/upload', formData, {
            onUploadProgress(progressEvent) {
                if (progressEvent.total) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                    setImagesInfo(prevState => {
                        if (prevState) {
                            return { ...prevState, progress: percentCompleted }
                        }

                        return prevState;
                    });
                }
            },
        })
    } catch (error: any) {
        throw new Error(error);
    }
}