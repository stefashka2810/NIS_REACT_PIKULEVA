import type {ReactNode} from "react";
import Header from "../components/layout/header/Header.tsx";

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}

export default Layout;