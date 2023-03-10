import {
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    Dialog,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
} from "@mui/material";
import CreateProduct from "../components/CreateProduct";
import ListProducts from "../components/ListProducts";
import { useState, useEffect } from "react";
import { api } from "../axios";
import { router } from "@inertiajs/react";
import { FilePresent } from "@mui/icons-material";
import { ProductCard } from "../components/ListProducts/ProductCard";
export default function Home({ id }) {
    const [store, setStore] = useState({
        products: [],
    });
    const [productDialog, setProductDialog] = useState(false);

    function getStoreId() {
        return window.location.pathname.split("/").slice(-1);
    }
    async function getStore(id) {
        const { data } = await api(`/stores/${id}`);
        setStore(data);
    }
    function handleUpdateProducts(products) {
        setStore({
            ...store,
            products,
        });
        handleClose();
    }

    useEffect(() => {
        const [param] = getStoreId();
        getStore(param);
    }, []);
    const handleClose = () => setProductDialog(false);
    return (
        <>
            <div className="text-center ">
                <div className="text-3xl">
                    Loja - <b>{store.nomeFantasia}</b>
                </div>
                <div className="text-xl">{store.cnpj}</div>
            </div>
            <div className="flex justify-center mt-5">
                <b className="text-2xl mx-4">
                    Produtos ({store.products.length})
                </b>
                <Button onClick={() => setProductDialog(true)}>
                    Gerenciar Produtos
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 p-5">
                {...store.products.map((product) => {
                    return <ProductCard classes="" product={product} />;
                })}
            </div>
            <Dialog open={productDialog} onClose={handleClose}>
                <ListProducts
                    storeProducts={store.products}
                    onSuccess={handleUpdateProducts}
                    onClose={handleClose}
                    storeId={getStoreId()[0]}
                />
            </Dialog>
        </>
    );
}
