import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { api } from "/resources/js/axios";
import validations from "./validations";
import { router } from "@inertiajs/react";
import LoadingButton from "@mui/lab/LoadingButton";

export default function LoginForm({}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validations),
    });
    async function login(data) {
        try {
            await api.post("/login", data);
            router.get("/");
        } catch {}
    }
    return (
        <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(login)}>
            <div className="text-2xl text-center mb-10">
                Autentique-se para continuar
            </div>
            <TextField
                label="Email"
                variant="standard"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={`${errors.email?.message || ""}`}
            />
            <TextField
                label="Senha"
                variant="standard"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={`${errors.password?.message || ""}`}
            />

            <LoadingButton
                type="submit"
                loading={isSubmitting}
                variant="contained"
            >
                Entrar
            </LoadingButton>
        </form>
    );
}
