import { router } from "@inertiajs/react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import toast from "../toast";
import { useForm } from "react-hook-form";
import { api } from "../axios";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
export default function Home({ user }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const defaultRegisterForm = {
        email: "",
        password: "",
        name: "",
    };
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [registerDialog, setRegisterDialog] = useState(false);
    function handleClose() {
        setRegisterDialog(false);
    }

    async function login(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/login", loginForm);
            router.get("/");
        } catch {}
        setLoading(false);
    }
    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center pb-20">
                <div className="w-3/4 md:w-2/4 lg:w-1/4">
                    <LoginForm />
                    <div className="text-sm text-right">
                        <span className="mr-1">Não tem uma conta?</span>
                        <b
                            onClick={() => setRegisterDialog(true)}
                            className="text-sky-700 cursor-pointer"
                        >
                            Registre-se
                        </b>
                    </div>
                </div>
            </div>
            <Dialog open={registerDialog} onClose={handleClose}>
                <RegisterForm onClose={handleClose} />
            </Dialog>
        </>
    );
}
