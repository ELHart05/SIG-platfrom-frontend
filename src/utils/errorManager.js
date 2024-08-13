import { toast } from "react-toastify";

export default function errorManager(error) {
    let errorMessage = 'An error occurred, please try again later';
    if (error?.message) {
        errorMessage = error.message;
    } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
    }
    toast.error(errorMessage)
}