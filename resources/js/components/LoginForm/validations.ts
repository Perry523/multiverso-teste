import { object, number, string, ref } from "yup";
import { isValidCNPj } from "../../utils/validators";
export default object({
    email: string().required("Campo obrigatório").email("Email inválido"),
    password: string()
        .required("Campo obrigatório")
        .min(3, "A senha deve conter ao menos 3 caracteres"),
}).required();
