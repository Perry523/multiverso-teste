// import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import "./axios.ts";
import Layout from "./layout/index";
createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/*.tsx", { eager: true });
        return pages[`./pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <Layout info={props}>
                <App {...props} />
            </Layout>
        );
    },
});
