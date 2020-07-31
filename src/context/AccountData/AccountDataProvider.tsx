import React, { useState } from "react";
import AccountDataContext, { initialAccountData, AccountData, Account } from "./index";

type Props = {
    children: React.ReactNode
}

// type State = AccountData;

const AccountDataProvider: React.FC<Props> = (props: Props) => {

    const setAccount = () => {

        /*
        try {
            const res = await fetch('/api/account/');
            const account = await res.json();
            console.log(account)

            setState({...state, account: account})
        } catch (e) {

            console.log(e);
        }

         */

        fetch('/api/account', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(response => response.json())
            .then((response: any) => {
                console.log(response)
                setState({
                    ...state, account: {
                        cached: {
                            userId: response.cached.user_id,
                            username: response.cached.username,
                            email: response.cached.email,
                            nick: response.cached.nick,
                            picture: response.cached.picture
                        },
                        stat: {
                            writeCount: response.stat.write_count,
                            commentCount: response.stat.comment_count,
                        },
                        userPoint: response.user_point,
                    }
                })
                console.log(state.account)
            })


        console.log("setAccount in AccountDataProvider")
    }

    const initState = {
        account: initialAccountData.account,
        setAccount: setAccount,
    }

    const [state, setState] = useState<AccountData>(initState)

    return (
        <AccountDataContext.Provider value={state}>
            {props.children}
        </AccountDataContext.Provider>
    )
}

export default AccountDataProvider


/* class AccountDataProvider extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...initialAccountData,
            setAccount: this.setAccount
        };
        this.setAccount = this.setAccount.bind(this);
    }

    setAccount = () => {
        fetch('http://127.0.0.1:8000/api/account', {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
  })
      .then(response => response.json())
      .then((response: Account) => {

          console.log(response)

          this.setState({account: response});
      })

    };

    render() {
        return (
            <AccountDataContext.Provider value={this.state}>
                {this.props.children}
            </AccountDataContext.Provider>
        );
    }
}

export default AccountDataProvider; */



/* try {
    const res = await fetch('/api/account/');
    const account = await res.json();
    console.log(account)

    setState({...state, account: account})
} catch (e) {

    console.log(e);
}

console.log(state.account) */