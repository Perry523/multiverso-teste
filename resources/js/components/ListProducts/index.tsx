import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    Divider,
    ListItemText,
    TextField,
    Menu,
    MenuItem,
} from "@mui/material";
import CreateProduct from "../CreateProduct";
import {
    ExpandMore,
    AddBox,
    DisabledByDefault,
    East,
    West,
    MoreVert,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { api } from "/resources/js/axios";
import { ProductCard } from "./ProductCard";

export default function CreateStore({
    onSuccess,
    onClose,
    storeProducts,
    storeId,
}) {
    const [isEdit, setIsEdit] = useState(false);
    const [storeProductsSearch, setStoreProductsSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [addedProducts, setAddedProducts] = useState([]);
    const [removedProducts, setRemovedProducts] = useState([]);
    const [productDialog, setProductDialog] = useState(false);
    const [createProductDialog, setCreateProductDialog] = useState(false);
    const [availableProductsSearch, setAvailableProductsSearch] = useState("");
    const [filteredStoreProducts, setFilteredStoreProducts] = useState([]);
    const [filteredAvailableProducts, setFilteredAvailableProducts] = useState(
        []
    );
    let addedProductIds = [];
    let storeProductIds = [];
    let removedProductIds = [];

    function filterStoreProducts() {
        const availableProducts = storeProducts.filter(
            ({ id }) => !removedProductIds.includes(id)
        );
        if (storeProductsSearch === "") {
            setFilteredStoreProducts(availableProducts);
            return;
        }
        const normalizedSearch = storeProductsSearch
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        const filteredProducts = availableProducts.filter((product) => {
            const normalizedName = product.nome
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            return normalizedName.indexOf(normalizedSearch) > -1;
        });
        setFilteredStoreProducts(filteredProducts);
    }
    function filterAvailableProducts() {
        const availableProducts = products.filter(
            ({ id }) =>
                !addedProductIds.includes(id) && !storeProductIds.includes(id)
        );
        if (availableProductsSearch === "") {
            setFilteredAvailableProducts(availableProducts);
            return;
        }
        const normalizedSearch = availableProductsSearch
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        const filteredProducts = availableProducts.filter((product) => {
            const normalizedName = product.nome
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            return normalizedName.indexOf(normalizedSearch) > -1;
        });
        setFilteredAvailableProducts(filteredProducts);
    }
    async function getProducts() {
        const { data } = await api("/products");
        setProducts(data);
    }
    async function handleCreateProduct() {
        setCreateProductDialog(false);
        if (isEdit) {
            const { data } = await api.get("products-by-store", {
                params: {
                    id: storeId,
                },
            });
            onSuccess(data);
        } else getProducts();
    }
    const handleCloseCreateProduct = () => setCreateProductDialog(false);
    const handleCloseProducts = () => setProductDialog(false);
    function addProduct(product) {
        setAddedProducts([...addedProducts, product]);
    }
    function removeProduct(product) {
        setRemovedProducts([...removedProducts, product]);
    }
    function handleInfoClick(product) {
        setSelectedProduct(product);
        setProductDialog(true);
    }
    async function save() {
        const productsToLinkIds = addedProducts.map(({ id }) => id);
        const productsToRemoveIds = removedProducts.map(({ id }) => id);
        try {
            const { data } = await api.post("products-link", {
                store_id: storeId,
                products_to_link: productsToLinkIds,
                products_to_remove: productsToRemoveIds,
            });
            onSuccess(data);
        } catch (error) {}
    }
    async function handleEditClick(product) {
        setSelectedProduct(product);
        setIsEdit(true);
        setCreateProductDialog(true);
    }
    useEffect(() => {
        getProducts();
    }, []);
    useEffect(() => {
        addedProductIds = addedProducts.map(({ id }) => id);
        storeProductIds = storeProducts.map(({ id }) => id);
        filterAvailableProducts();
    }, [products, availableProductsSearch, addedProducts]);
    useEffect(() => {
        removedProductIds = removedProducts.map(({ id }) => id);
        filterStoreProducts();
    }, [products, storeProductsSearch, storeProducts, removedProducts]);
    function ExpandMoreMenu({ product }) {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const expandMoreOptions = [
            {
                label: "Detalhes",
                action: () => handleInfoClick(product),
            },
            {
                label: "Editar",
                action: () => handleEditClick(product),
            },
        ];
        return (
            <>
                <IconButton
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVert />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {expandMoreOptions.map(({ label, action }, i) => (
                        <MenuItem key={i} onClick={action}>
                            {label}
                        </MenuItem>
                    ))}
                </Menu>
            </>
        );
    }
    return (
        <>
            <DialogTitle className="flex justify-center relative">
                <div>Produtos</div>
                <Button
                    className="absolute right-0"
                    onClick={() => {
                        setIsEdit(false);
                        setCreateProductDialog(true);
                    }}
                >
                    Novo Produto
                </Button>
            </DialogTitle>
            <DialogContent>
                <div className="flex flex-wrap gap-x-3 justify-center">
                    <div className="mb-3">
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                className="p-0"
                                expandIcon={<ExpandMore />}
                            >
                                <div>Produtos da loja</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField
                                    size="small"
                                    label="Filtrar"
                                    value={storeProductsSearch}
                                    onChange={(e) =>
                                        setStoreProductsSearch(e.target.value)
                                    }
                                />
                                <List
                                    style={{
                                        maxHeight: 170,
                                        overflow: "auto",
                                    }}
                                    dense
                                >
                                    <Divider />
                                    {...addedProducts.map((product, i) => (
                                        <>
                                            <ListItem
                                                className="bg-green-300"
                                                secondaryAction={
                                                    <div className="flex gap-x-2">
                                                        <IconButton
                                                            edge="end"
                                                            color="error"
                                                            aria-label="delete"
                                                            onClick={() => {
                                                                const allProducts =
                                                                    [
                                                                        ...addedProducts,
                                                                    ];

                                                                allProducts.splice(
                                                                    i,
                                                                    1
                                                                );
                                                                setAddedProducts(
                                                                    allProducts
                                                                );
                                                            }}
                                                        >
                                                            <East color="error" />
                                                        </IconButton>
                                                        <ExpandMoreMenu
                                                            product={product}
                                                        />
                                                    </div>
                                                }
                                            >
                                                <ListItemText
                                                    primary={product.nome}
                                                />
                                            </ListItem>
                                            <Divider />
                                        </>
                                    ))}
                                    {...filteredStoreProducts.map((product) => (
                                        <>
                                            <ListItem
                                                secondaryAction={
                                                    <div className="flex gap-x-2">
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="delete"
                                                            onClick={() => {
                                                                removeProduct(
                                                                    product
                                                                );
                                                            }}
                                                        >
                                                            <DisabledByDefault color="error" />
                                                        </IconButton>
                                                        <ExpandMoreMenu
                                                            product={product}
                                                        />
                                                    </div>
                                                }
                                            >
                                                <ListItemText
                                                    primary={product.nome}
                                                />
                                            </ListItem>
                                            <Divider />
                                        </>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <div>Produtos disponíveis</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField
                                    label="Filtrar"
                                    size="small"
                                    value={availableProductsSearch}
                                    onChange={(e) =>
                                        setAvailableProductsSearch(
                                            e.target.value
                                        )
                                    }
                                />
                                <List
                                    style={{
                                        maxHeight: 170,
                                        overflow: "auto",
                                    }}
                                    dense
                                >
                                    <Divider component="li" />
                                    {...removedProducts.map((product, i) => (
                                        <>
                                            <ListItem
                                                className="bg-red-300"
                                                secondaryAction={
                                                    <div className="flex gap-x-2">
                                                        <IconButton
                                                            edge="end"
                                                            color="error"
                                                            aria-label="delete"
                                                            onClick={() => {
                                                                const allProducts =
                                                                    [
                                                                        ...removedProducts,
                                                                    ];

                                                                allProducts.splice(
                                                                    i,
                                                                    1
                                                                );
                                                                setRemovedProducts(
                                                                    allProducts
                                                                );
                                                            }}
                                                        >
                                                            <West color="success" />
                                                        </IconButton>
                                                        <ExpandMoreMenu
                                                            product={product}
                                                        />
                                                    </div>
                                                }
                                            >
                                                <ListItemText
                                                    primary={product.nome}
                                                />
                                            </ListItem>
                                            <Divider />
                                        </>
                                    ))}
                                    {...filteredAvailableProducts.map(
                                        (product) => (
                                            <>
                                                <ListItem
                                                    key={product.id}
                                                    secondaryAction={
                                                        <div className="flex gap-x-2">
                                                            <IconButton
                                                                edge="end"
                                                                onClick={() =>
                                                                    addProduct(
                                                                        product
                                                                    )
                                                                }
                                                                aria-label="delete"
                                                            >
                                                                <AddBox />
                                                            </IconButton>

                                                            <ExpandMoreMenu
                                                                product={
                                                                    product
                                                                }
                                                            />
                                                        </div>
                                                    }
                                                >
                                                    <ListItemText
                                                        primary={product.nome}
                                                    />
                                                </ListItem>
                                                <Divider component="li" />
                                            </>
                                        )
                                    )}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={save}>Salvar</Button>
            </DialogActions>
            <Dialog
                open={createProductDialog}
                onClose={handleCloseCreateProduct}
            >
                <CreateProduct
                    onCreate={handleCreateProduct}
                    onClose={handleCloseCreateProduct}
                    edit={isEdit}
                    defaultProduct={selectedProduct}
                />
            </Dialog>
            <Dialog open={productDialog} onClose={handleCloseProducts}>
                <ProductCard classes="px-3" product={selectedProduct} />
            </Dialog>
        </>
    );
}
