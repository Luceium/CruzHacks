"use client"

import { useState } from "react";
import className from "classnames";

type Props = {
    name?: string,
    className?: string,
    placeholder?: string,
    type?: string,
    initialValue: string[],
}

export default function MultiInput(props: Props) {
    const [value, setValue] = useState(props.initialValue);
    const [nextValue, setNextValue] = useState("");
    return <div className={className("form-control")}>
        <div className="input-group flex flex-wrap justify-between gap-2">
            <input className="hidden" name={props.name} />
            <input className='input input-large' type={props.type} placeholder={props.placeholder} value={nextValue} onChange={e => setNextValue(e.target.value)}/>
            <button className="btn" onClick={() => {
                console.log(value, nextValue);
                setValue([...value, nextValue]);
                setNextValue("");
            }}>+</button>
        </div>
        <div className="flex max-h-20 flex-wrap gap-2">
            {value.map((v, i) => <div key={i} className="badge">
                {v}
            </div>)}
        </div>
    </div>
}