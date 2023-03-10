import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../axios";
import validations from "./validations";
export default function CreateCity({ onCreateCity }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validations),
    });

    function handleClose() {}
    async function createCity(data) {
        try {
            await api.post("/cities", data);
            onCreateCity();
        } catch (error) {}
    }
    return (
        <form onSubmit={handleSubmit(createCity)}>
            <DialogTitle className="text-center">Cadastrar Cidade</DialogTitle>
            <DialogContent sx={{ p: 2 }}>
                <TextField
                    {...register("nome")}
                    error={!!errors.name}
                    label="Nome da cidade"
                    helperText={`${errors.name?.message || ""}`}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={() => console.log(errors)} type="submit">
                    Finalizar
                </Button>
            </DialogActions>
        </form>
    );
}
