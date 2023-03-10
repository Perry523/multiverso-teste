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
} from "@mui/material";
import CreateCity from "../components/CreateCity";
import CreateStore from "../components/CreateStore";
import { useState, useEffect } from "react";
import { api } from "../axios";
import { router } from "@inertiajs/react";

export default function Home({ user }) {
    const [selectedCity, setSelectedCity] = useState<Number | undefined>();
    const [cities, setCities] = useState([{ nome: "", id: undefined }]);
    const [store, setStore] = useState("");
    const [stores, setStores] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);

    const [cityDialog, setCityDialog] = useState(false);
    const [storeDialog, setStoreDialog] = useState(false);

    async function getStores() {
        const { data } = await api("/stores");
        setStores(data);
    }
    async function getCities() {
        const { data } = await api("/cities");
        setCities(data);
    }
    function handleCreateCity() {
        setCityDialog(false);
        getCities();
    }
    function handleCreateStore() {
        setStoreDialog(false);
        getStores();
    }
    function filterStores() {
        if (store === "" && !selectedCity) {
            setFilteredStores(stores);
        } else {
            const normalizedSearch = store
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            const filteredStores = stores.filter((currentStore) => {
                if (selectedCity && currentStore.city_id !== selectedCity)
                    return false;
                if (store === "") return true;
                const normalizedName = currentStore.nomeFantasia
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                return normalizedName.indexOf(normalizedSearch) > -1;
            });
            setFilteredStores(filteredStores);
        }
    }
    useEffect(() => {
        getCities();
        getStores();
    }, []);
    useEffect(() => {
        filterStores();
    }, [selectedCity, store, stores]);
    return (
        <>
            <div className="p-3">
                <div className="flex items-center justify-center gap-x-2 relative">
                    <FormControl className="md:w-2/12 w-3/12">
                        <InputLabel id="city-label">Cidades</InputLabel>
                        <Select
                            labelId="city-label"
                            value={selectedCity}
                            label="Cidade"
                            onChange={(city) =>
                                setSelectedCity(Number(city.target.value))
                            }
                        >
                            {...cities.map(({ nome, id }) => (
                                <MenuItem value={id}>{nome}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id=""
                        label="Buscar loja"
                        value={store}
                        className="md:w-3/12 w-4/12"
                        onChange={(e) => setStore(e.target.value)}
                    />
                    <div className="flex absolute right-0">
                        <Button
                            onClick={() => setCityDialog(true)}
                            sx={{ mr: 1 }}
                            size="small"
                            variant="text"
                        >
                            Nova Cidade
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <b className="text-2xl mx-4">
                        Lojas ({filteredStores.length})
                    </b>
                    <Button onClick={() => setStoreDialog(true)}>
                        + Adicionar Loja
                    </Button>
                </div>
                <div className="grid grid-cols-3 mt-5">
                    {...filteredStores.map((store) => {
                        return (
                            <Card raised>
                                <CardContent>
                                    <div className="text-2xl mb-2 text-center">
                                        Loja: {store.nomeFantasia}
                                    </div>
                                    <div>Cnpj: {store.cnpj}</div>
                                    <div>Ramo: {store.nicho}</div>
                                    <div>Localização: {store.endereco}</div>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <Button
                                        fullWidth
                                        size="small"
                                        onClick={() =>
                                            router.get(`/loja/${store.id}`)
                                        }
                                    >
                                        Ver Produtos
                                    </Button>
                                </CardActions>
                            </Card>
                        );
                    })}
                </div>
            </div>
            <Dialog open={cityDialog} onClose={() => setCityDialog(false)}>
                <CreateCity onCreateCity={handleCreateCity} />
            </Dialog>
            <Dialog
                fullWidth
                maxWidth="md"
                open={storeDialog}
                onClose={() => setCityDialog(false)}
            >
                <CreateStore
                    onClose={() => setStoreDialog(false)}
                    cities={cities}
                    onCreate={handleCreateStore}
                />
            </Dialog>
        </>
    );
}
