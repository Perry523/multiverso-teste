import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function toast(options: object) {
    Toastify({
        position: "center",
        ...options,
    }).showToast();
}
