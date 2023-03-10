import { router, usePage } from "@inertiajs/react";
import { AccountCircle, West } from "@mui/icons-material";
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { api } from "../axios";
import { useState, useEffect } from "react";

export default function Layout({ children, info }) {
    const [routeName, setRouteName] = useState("");
    function LogoutMenu() {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        async function logout() {
            await api.post("/logout");
            router.get("/login");
        }
        const expandMoreOptions = [
            {
                label: "Sair",
                action: () => logout(),
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
                    <AccountCircle fontSize="large" className="text-white" />
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
    function test() {
        window.history.back();
        setTimeout(() => {
            getRouteName();
        }, 10);
    }
    function getRouteName(link = window.location.pathname) {
        if (link.includes("loja")) setRouteName("Loja");
        else if (link.includes("login")) setRouteName("Login");
        else setRouteName("Buscar Lojas");
    }
    function hideIcons() {
        return routeName.includes("Login");
    }
    router.on("start", (event) => {
        getRouteName(event.detail.visit.url.pathname);
    });
    useEffect(() => {
        getRouteName();
    }, []);
    return (
        <>
            <AppBar position="relative" color="primary">
                <Toolbar className="justify-between">
                    <div className="flex items-center">
                        {!hideIcons() && (
                            <IconButton onClick={test}>
                                <West className="text-white" />
                            </IconButton>
                        )}
                        <div>{routeName}</div>
                    </div>
                    {!hideIcons() && <LogoutMenu />}
                </Toolbar>
            </AppBar>
            <div>{children}</div>
        </>
    );
}
