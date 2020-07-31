import * as React from "react"; 

export type Cached = {
    userId: number;
    username: string;
    email: string;
    nick: string;
    picture: string;
}

export type Profile = {
    nick: string;
    picture: string;
}

export type Stat = {
    writeCount: number;
    commentCount: number;
}

export type Account = {
    cached: Cached;
    stat: Stat
    userPoint: number;
}

export type AccountData = {
    account: Account,

    setAccount: () => void
}

export const initialAccountData = {
    account: {
        cached: {
            userId: -1,
            username: '삐약이',
            email: 'none',
            nick: '삐약삐약',
            picture: 'https://static.seiyon.net/images/anony.png',
        },
        stat: {
            writeCount: 0,
            commentCount: 0,
        },
        userPoint: 0,
    },

    setAccount: () => {}
};

const AccountDataContext = React.createContext<AccountData>(initialAccountData);

export default AccountDataContext;