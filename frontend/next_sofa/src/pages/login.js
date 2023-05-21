import LoginPage from "@/components/Authentication/login";
import { AuthProvider } from "@/context/AuthenticationContext";

export  default function Login(){
    return <>
        <AuthProvider>
            <LoginPage/>
        </AuthProvider>
    </>
}