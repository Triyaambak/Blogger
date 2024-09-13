import { useEffect, useState } from "react"
import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_PORT}`;

const useGetAllBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [allBlogs, setAllBlogs] = useState(false);

    useEffect(() => { 
        
    }, []);

    return {
        loading, 
        allBlogs,
    }
}

export default useGetAllBlogs;