import React, {Component, useState, useEffect} from "react";
import './styles.css'


type Props = {}

type State = {}

const Index: React.FC<Props> = (props: Props) => {

    const [time, setTime] = useState(new Date());

    return (
        <div>
            <h2>{time.toLocaleString()}</h2>
        </div>
    )


};

export default Index