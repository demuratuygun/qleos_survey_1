'use client'
import { useEffect, useState } from "react";


const Filter = ({data, onFilterd, ex}) => {

    const [selected, setSelected] = useState(data.map(()=>true));


    useEffect( () => {
        if(!ex) setSelected(data.map(()=>true));
        else setSelected( data.map( d => ex.includes(d)?false:true) )
    }, [ex])

    return (
        <div className={"grid grid-cols-1 bg-stone-700 rounded-xl py-2 m-5"}>
            { data.map( (text, i) => (
                selected[i]?
                <div className={"p-1 px-4 hover:bg-stone-600 rounded-md text-neutral-300"} key={'opt-'+text} onClick={() => setSelected(prevSelected=> {prevSelected[i] = false; onFilterd(data.filter((v,i) => !prevSelected[i])); return [...prevSelected];})}>{text}</div>:
                <div className={"p-1 px-4 hover:bg-stone-600 rounded-md text-neutral-500"} key={'opt-'+text} onClick={() => setSelected(prevSelected=> {prevSelected[i] = true; onFilterd(data.filter((v,i) => !prevSelected[i])); return [...prevSelected];})}>{text}</div>
                )
            )}
        </div>
    );
}

export default Filter;