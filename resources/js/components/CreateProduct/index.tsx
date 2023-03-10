import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../axios";
import { NumericFormat } from "react-number-format";

import validations from "./validations";
import { forwardRef } from "react";
export default function CreateStore({
    onCreate,
    onClose,
    defaultProduct = {},
    edit = false,
}) {
    let defaultValues = {
        preco: "0,00",
        peso: "0",
        descricao: "",
        nome: "",
        cor: "",
    };
    if (edit) defaultValues = defaultProduct;
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validations),
        defaultValues,
    });
    async function createProduct(data) {
        try {
            if (edit) await api.put(`/products/${data.id}`, data);
            else await api.post("/products", data);
            onCreate();
        } catch (error) {}
    }
    interface CustomProps {
        onChange?: (event: { target: { value: string } }) => void;
        currency: boolean;
        fieldProps: object;
    }

    const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
        function TextMaskCustom(props, ref) {
            const { onChange, currency, fieldProps, ...other } = props;
            let options = {};
            if (currency) {
                options = {
                    suffix: " R$",
                    decimalScale: 2,
                };
            }
            options = {
                ...options,
                ...fieldProps,
            };
            return (
                <NumericFormat
                    {...other}
                    {...options}
                    getInputRef={ref}
                    allowLeadingZeros
                    onValueChange={(values) => {
                        onChange({
                            target: { value: values.value },
                        });
                    }}
                    thousandSeparator="."
                    decimalSeparator=","
                    valueIsNumericString
                />
            );
        }
    );
    function NumberField({
        value,
        label,
        id,
        currency = false,
        fieldProps = {},
    }) {
        let fieldValue = value;
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            fieldValue = Number(event.target.value);
            setValue(id, event.target.value);
        };
        const handleBlur = () => {
            if (errors[id]) {
                trigger(id);
            }
        };
        return (
            <FormControl>
                <InputLabel error={!!errors[id]} htmlFor="preco">
                    {label}
                </InputLabel>
                <Input
                    value={fieldValue}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputComponent={TextMaskCustom as any}
                    inputProps={{ currency, fieldProps }}
                />
                <FormHelperText error={!!errors[id]}>
                    {`${errors[id]?.message || ""}`}
                </FormHelperText>
            </FormControl>
        );
    }
    return (
        <form onSubmit={handleSubmit(createProduct)}>
            <DialogTitle className="text-center">Novo Produto</DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-2 gap-4 mb-2">
                    <TextField
                        {...register("nome")}
                        error={!!errors.nome}
                        label="Nome *"
                        variant="standard"
                        helperText={`${errors.nome?.message || ""}`}
                    />

                    <TextField
                        {...register("cor")}
                        error={!!errors.cor}
                        label="Cor"
                        variant="standard"
                        helperText={`${errors.cor?.message || ""}`}
                    />
                    <NumberField
                        currency
                        label="Preço *"
                        id="preco"
                        value={getValues("preco")}
                    />
                    <NumberField
                        label="Peso"
                        id="peso"
                        fieldProps={{
                            suffix: " gramas",
                            decimalScale: 3,
                        }}
                        value={getValues("peso")}
                    />
                </div>
                <TextField
                    className="w-full"
                    {...register("descricao")}
                    error={!!errors.descricao}
                    label="Descrição *"
                    variant="standard"
                    helperText={`${errors.descricao?.message || ""}`}
                    multiline
                    rows={3}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">Finalizar</Button>
            </DialogActions>
        </form>
    );
}
