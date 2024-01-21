"use client"

import { useState } from "react";
import className from "classnames";

type Props = {
    name?: string,
    className?: string,
    placeholder?: string,
    type?: string,
    initialValue?: string[],
    onChange?: (value: string[]) => void,
    onAdd?: (value: string) => void,
    onRemove?: (value: string) => void
}

export default function MultiInput(props: Props) {
    const [value, setValue] = useState(props.initialValue ?? []);
    const [nextValue, setNextValue] = useState("");
    return <div className={className("form-control", props.className)}>
        <div className="input-group flex w-full justify-between gap-2">
            <input className="hidden" name={props.name} value={value.join(",")} />
            <input className='input flex-1 min-w-0' type={props.type} placeholder={props.placeholder} value={nextValue} onChange={e => setNextValue(e.target.value)}/>
            <button className="btn" type="button" onClick={() => {
                const newValue = [...value, nextValue];
                props.onAdd?.(nextValue);
                setValue(newValue);
                setNextValue("");
                props.onChange?.(newValue);
            }}>+</button>
        </div>
        <div className="flex max-w-80 flex-wrap gap-2 py-4">
            {value.map((v, i) => <div key={i} className="badge">
                {v}
                <button className="ml-3 hover:text-secondary hover:text-lg" type="button" onClick={() => {
                    const newValue = value.filter((_, j) => j !== i);
                    props.onRemove?.(v);
                    setValue(newValue);
                    props.onChange?.(newValue)
                }}>x</button>
            </div>)}
        </div>
    </div>
}