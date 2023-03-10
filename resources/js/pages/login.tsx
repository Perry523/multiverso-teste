import { Dialog } from "@mui/material";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
export default function Login({ user }) {
    const [registerDialog, setRegisterDialog] = useState(false);
    function handleClose() {
        setRegisterDialog(false);
    }
    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center pb-20">
                <div className="w-3/4 md:w-2/4 lg:w-1/4">
                    <LoginForm />
                    <div className="text-sm text-right">
                        <span className="mr-1">Não tem uma conta?</span>
                        <b
                            onClick={() => setRegisterDialog(true)}
                            className="text-sky-700 cursor-pointer"
                        >
                            Registre-se
                        </b>
                    </div>
                </div>
            </div>
            <Dialog open={registerDialog} onClose={handleClose}>
                <RegisterForm onClose={handleClose} />
            </Dialog>
        </>
    );
}
