import { yupResolver } from "@hookform/resolvers/yup";
import {
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { api } from "/resources/js/axios";
import validations from "./validations";

export default function RegisterForm({ onClose }) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validations),
    });
    async function submitRegister(form) {
        try {
            const { data } = await api.post("/register", form);
            onClose();
        } catch {}
    }
    return (
        <form onSubmit={handleSubmit(submitRegister)}>
            <DialogTitle className="text-center">Realizar Cadastro</DialogTitle>
            <DialogContent className="d-flex flex-col">
                {/* <DialogContentText>
        To subscribe to this website, please enter your email
        address here. We will send updates occasionally.
    </DialogContentText> */}
                <div className="grid grid-cols-2 gap-3 my-3">
                    <TextField
                        label="Nome"
                        variant="standard"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={`${errors.name?.message || ""}`}
                    />
                    <TextField
                        label="Email"
                        variant="standard"
                        type="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={`${errors.email?.message || ""}`}
                    />
                    <TextField
                        label="Confirmar Senha"
                        variant="standard"
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={`${errors.password?.message || ""}`}
                    />
                    <TextField
                        label="Confirmar Senha"
                        variant="standard"
                        className="py-10"
                        type="password"
                        {...register("confirm_password")}
                        error={!!errors.confirm_password}
                        helperText={`${errors.confirm_password?.message || ""}`}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">Finalizar</Button>
            </DialogActions>
        </form>
    );
}
