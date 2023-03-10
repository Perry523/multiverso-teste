import { object, string } from "yup";
export default object({
    nome: string().required("Campo obrigatório"),
}).required();
