import { object, string } from "yup";
import { isValidCNPj } from "../../utils/validators";
export default object({
    nomeFantasia: string().required("Campo obrigatório"),
    cidade: string().required("Campo obrigatório"),
    endereco: string().required("Campo obrigatório"),
    nicho: string().required("Campo obrigatório"),
    cnpj: string()
        .required("Campo obrigatório")
        .test("test-invalid-cnpj", "CNPJ inválido", (cpf) => isValidCNPj(cpf)),
}).required();
