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
            <input className="hidden" name={props.name} value={value.join(",")} />
            <input className='input input-large' type={props.type} placeholder={props.placeholder} value={nextValue} onChange={e => setNextValue(e.target.value)}/>
            <button className="btn" type="button" onClick={() => {
                console.log(value, nextValue);
                setValue([...value, nextValue]);
                setNextValue("");
            }}>+</button>
        </div>
        <div className="flex max-w-80 flex-wrap gap-2 py-4">
            {value.map((v, i) => <div key={i} className="badge">
                {v}
                <button className="ml-3 hover:text-secondary hover:text-lg" type="button" onClick={() => {
                    setValue(value.filter((_, j) => j !== i));
                }}>x</button>
            </div>)}
        </div>
    </div>
}