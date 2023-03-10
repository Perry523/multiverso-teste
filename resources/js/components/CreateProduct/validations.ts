import { object, number, string } from "yup";
import { isValidCNPj } from "../../utils/validators";
export default object({
    nome: string().required("Campo obrigatório"),
    preco: string()
        .required("Campo obrigatório")
        .test(
            "test-invalid-value",
            "Insira um preço",
            (preco) => Number(preco) > 0
        ),
    descricao: string().required("Campo obrigatório"),
    cor: string(),
    peso: string(),
}).required();
