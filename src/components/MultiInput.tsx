"use client"

import { useEffect, useState } from "react";
import className from "classnames";

type Props = {
    name?: string,
    className?: string,
    placeholder?: string,
    type?: string,
    initialValue?: string[],
    onChange?: (value: string[]) => void,
    onAdd?: (value: string) => void,
    onRemove?: (value: string) => void,
    dontUpdateImmediately?: boolean
}

export default function MultiInput(props: Props) {
    const [value, setValue] = useState(props.initialValue ?? []);
    useEffect(() => {
        setValue(value => props.initialValue ?? value);
    }, [props.initialValue])
    const [nextValue, setNextValue] = useState("");
    
    function addNewValue() {
        console.log("ADDED")
        const newValue = [nextValue, ...value];
        props.onAdd?.(nextValue);
        if (!props.dontUpdateImmediately) {
            setValue(newValue);
        }
        setNextValue("");
        props.onChange?.(newValue);
    }

    return <div className={className("form-control", props.className)}>
        <div className="input-group flex w-full justify-between gap-2">
            <input className="hidden" name={props.name} value={value.join(",")} readOnly />
            <input className='input flex-1 min-w-0' type={props.type} placeholder={props.placeholder} value={nextValue} onChange={e => setNextValue(e.target.value)} onKeyDown={e => {
                if (e.key === "Enter") {
                    addNewValue();
                }
            }}/>
            <button className="btn" type="button" onClick={addNewValue}>+</button>
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