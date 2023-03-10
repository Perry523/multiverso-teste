import { Card, CardContent, Divider, CardActions } from "@mui/material";

export function ProductCard({ product, classes = "" }) {
    function numberToBrl(price) {
        const formatter = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });
        return formatter.format(price);
    }
    return (
        <Card className={classes} raised>
            <CardContent>
                <div className="text-2xl mb-2 text-center">{product.nome}</div>

                <div className="my-3">
                    <li>{product.cor}</li>
                    <li>{product.peso} gramas</li>
                </div>
                <Divider></Divider>
                <div className="text-center mt-1">Sobre o produto</div>
                <div className="mt-2">{product.descricao}</div>
            </CardContent>
            <CardActions disableSpacing>
                <b className="text-xl">{numberToBrl(product.preco)}</b>
            </CardActions>
        </Card>
    );
}
