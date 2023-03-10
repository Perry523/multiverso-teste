import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Select,
    TextField,
    MenuItem,
} from "@mui/material";
import { IMaskInput } from "react-imask";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../axios";
import validations from "./validations";
import { forwardRef, useState } from "react";
export default function CreateStore({ onCreate, cities, onClose }) {
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validations),
    });
    function handleClose() {}
    async function createCity(data) {
        try {
            await api.post("/stores", data);
            onCreate();
        } catch (error) {}
    }
    interface CustomProps {
        onChange: (event: { target: { name: string; value: string } }) => void;
    }

    const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
        function TextMaskCustom(props, ref) {
            const { onChange, ...other } = props;
            return (
                <IMaskInput
                    {...other}
                    mask="00.000.000/0000-00"
                    definitions={{
                        "#": /[1-9]/,
                    }}
                    inputRef={ref}
                    onAccept={(value: any) =>
                        onChange({ target: { name: props.name, value } })
                    }
                    overwrite
                />
            );
        }
    );
    function MaskedCnpj() {
        const defaultCnpj = getValues("cnpj");
        const [cnpj, setCnpj] = useState(defaultCnpj);
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setCnpj(event.target.value);
            setValue("cnpj", event.target.value);
        };
        const handleBlur = () => {
            if (errors.cnpj) {
                trigger("cnpj");
            }
        };
        return (
            <FormControl>
                <InputLabel error={!!errors.cnpj} htmlFor="cnpj">
                    Cnpj
                </InputLabel>
                <Input
                    value={cnpj}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputComponent={TextMaskCustom as any}
                />
                <FormHelperText error={!!errors.cnpj}>
                    {`${errors.cnpj?.message || ""}`}
                </FormHelperText>
            </FormControl>
        );
    }
    return (
        <form onSubmit={handleSubmit(createCity)}>
            <DialogTitle className="text-center">Cadastrar Loja</DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-2 gap-2">
                    <MaskedCnpj />

                    <TextField
                        {...register("nomeFantasia")}
                        error={!!errors.nomeFantasia}
                        label="Nome Fantasia"
                        variant="standard"
                        helperText={`${errors.nomeFantasia?.message || ""}`}
                    />
                    <TextField
                        {...register("endereco")}
                        error={!!errors.endereco}
                        label="Endereço"
                        variant="standard"
                        helperText={`${errors.endereco?.message || ""}`}
                    />
                    <FormControl variant="standard">
                        <InputLabel error={!!errors.cidade} id="city-label">
                            Cidades
                        </InputLabel>
                        <Select
                            {...register("cidade")}
                            labelId="city-label"
                            label="Cidade"
                        >
                            {...cities.map(({ nome, id }) => (
                                <MenuItem value={id}>{nome}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={!!errors.cnpj}>
                            {`${errors.cidade?.message || ""}`}
                        </FormHelperText>
                    </FormControl>

                    <TextField
                        {...register("nicho")}
                        error={!!errors.nicho}
                        label="Nicho"
                        variant="standard"
                        helperText={`${errors.nicho?.message || ""}`}
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
