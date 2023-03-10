import axios from "axios";
import toast from "./toast";

axios.defaults.baseURL = "/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const api = axios.create();

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const { response } = error;
        toast({
            text: response.data.message,

            style: {
                background: "#C00",
                color: "#eee",
            },
        });

        return Promise.reject(error);
    }
);

export { api };
