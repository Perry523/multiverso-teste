import { object, number, string, ref } from "yup";
import { isValidCNPj } from "../../utils/validators";
export default object({
    name: string().required("Campo obrigatório"),
    email: string().required("Campo obrigatório").email("Email inválido"),
    password: string()
        .required("Campo obrigatório")
        .min(3, "A senha deve conter ao menos 3 caracteres"),
    confirm_password: string()
        .required("Campo obrigatório")
        .oneOf([ref("password")], "As senhas não coincidem"),
}).required();
