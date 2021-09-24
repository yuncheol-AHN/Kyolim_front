import React, {useState} from "react"

export default function Store() {
    const [people, setPeople] = useState([
        {
            email: 'abc',
            password: '123'
        },
    ])

    return(
        <div></div>
    );
}
