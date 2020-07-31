
import React, { useContext } from "react";
import Home from "./index";
import AccountDataContext from "../../../context/AccountData";

const HomeHandler: React.FC = () => {
    // const state = useContext(AccountDataContext)

    return (
        <Home
            
        />
    );
};

export default HomeHandler;



{/* <AccountDataContext.Consumer>
    {({ account, setAccount }) =>
        <Home
            account={account}
            setAccount={setAccount}
        />
    }
</AccountDataContext.Consumer> */}