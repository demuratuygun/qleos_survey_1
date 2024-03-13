'use client'

import { useEffect, useRef, useState } from "react";

import survay from "./survay1-data.json";

import * as d3 from 'd3';
import PieChart from "../charts/PieChart";
import TurkeyMap from "../charts/TurkeyMap";
import Histogram from "../charts/Histogram";
import Select from "../Select";
import Filter from "./Filter";




function AggregateChoiceData({data, type, quest}) {
    let defaultValue = { "Select": [], "Pick": "cevap yok", "Image": -1 };
    console.log(typeof data);
    if ( !Object.keys(defaultValue).includes( type ) ) return "define a type";

    let objectCount = data.map( res => res[quest]??defaultValue[type] )
        .reduce((acc, item) => {
            if( type == "Select" ) item.forEach( ele => acc[ele] = (acc[ele] || 0) + 1 );
            else if ( type == "Pick" ) acc[item] = (acc[item] || 0) + 1;
            else if ( type == "Image" ) acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

    const total = Object.values(objectCount)
            .reduce( (acc:number, item:number) => acc+item ) as number;

    let object = Object.entries(objectCount)
        .map( pair => {return({"key":pair[0], "value":pair[1] as number})} )
        .sort( (a,b) => a.value>b.value? -1:1 );

    return(
        <div>
        <PieChart data={object} width={200} height={200}/>
        <div className={'font-mono '}>
            {object.map((d,i) => <div key={"text-"+i} style={{color: d3.schemeSet3[i]}}>%{(d.value/total*100).toFixed()} {d.key}</div>)}
        </div>
        </div>
    );
    
}



function AggregateLikeData({data}) {

    const imageurls = [
        "https://i.ibb.co/ypKSSfK/98aca446b43a1829c2245bbde9384faa.jpg",
        "https://i.ibb.co/Kr8srSh/Whats-App-Image-2024-03-05-at-11-00-48.jpg",
        "https://i.ibb.co/30LYb85/Whats-App-Image-2024-03-05-at-10-58-32.jpg",
        "https://i.ibb.co/ZWzDysC/2376c5e7b311df74883a432460cea6cd.jpg",
        "https://i.ibb.co/vzyGDTJ/8213d8bccb4ad0f8e2d4513d01b7641c.jpg",
        "https://i.ibb.co/ZfP3CKh/ce127cd24d3b6292e3ccf76925647877.jpg",
        "https://i.ibb.co/M8pNWhG/f49aa321a271fcac5749dd9c8365105b.jpg",
        "https://i.ibb.co/h17fb75/Kol-Do-vmeleri.jpg",
        "https://i.ibb.co/LrP902m/Untitled-Artwork-2.png",
        "https://i.ibb.co/M2FrmMt/de89a68ea0df1d3562c49dcaa728f04b.jpg",
        "https://i.ibb.co/HVMd2zz/7028b3c9c6b0d1ed87f70a14fbca629c.jpg",
        "https://i.ibb.co/2nV8kFC/b76a1681c6ed183d7a152f84af57684e.jpg",
        "https://i.ibb.co/qggQS49/764efee29b1d4abf75e0adaf9295fca6.jpg",
        "https://i.ibb.co/x72n5wk/9bf089e47ec773952d623e461d7237bd.jpg",
        "https://i.ibb.co/Tc8bFs8/1ebc8be8683ee90705156e4f3ccf5366.jpg",
        "https://i.ibb.co/gypMGBr/b35f86f606d6f25c2feeb4085624ac8d.jpg",
        "https://i.ibb.co/LJ8jSww/Whats-App-Image-2024-03-05-at-10-53-55.jpg",
        "https://i.ibb.co/gwt2Fq0/Whats-App-Image-2024-03-05-at-10-58-40.jpg",
        "https://i.ibb.co/ZfyfgDp/72704d7798336d1f9200dcb96f5714c9.jpg",
        "https://i.ibb.co/yY0KSz0/Untitled-Artwork-3.png"
      ];

    let matrix = data.map( res => res["swipe"] ).filter( v => v );
    if(matrix.length==0) return;
    let sumVector = matrix.reduce( (acc, item) => item.map( (v,i) => v + acc[i]??0 ) );

    let list = sumVector.map((v,i) => ({"key":i, "value":v, "url":imageurls[i]}) )
        .sort((a,b) => a.value>b.value? -1:1 )

    return (
        <div className={"h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
        {list.map( (v, i) => 
            <div key={"image-"+i} className={"shadow-lg rounded-lg relative m-5"}>
                <div className={"p-4 w-full text-lg font-bold text-center absolute bottom-0 top-0 "} ><span className={" text-black bg-white p-2 py-1 rounded-xl"}>{v.value}</span></div>
                <img draggable="false" className={'object-cover rounded-lg h-96 w-72'} src={v.url} alt="swipe"/>
            </div>
        )}
        </div>
    );

}

function AggregateLocation({data}) {

    let location = data.map( res => res["location"] ).filter( v => v );
    let aggRegion: {[key:string]:number} = location.reduce( (acc, item) => {
        acc[item.province+"-"+item.region] = (acc[item.province+"-"+item.region] || 0) + 1;
        return acc;
    }, {});
    
    return (<TurkeyMap data={aggRegion}/>)
}


function AggregateNumerical({data, name}) {

    let range = {
        "boy": [100, 300],
        "kilo": [30, 300],
        "yaş": [5, 70]
    }

    let numbers = data.map( res => parseInt(res[name]) ).filter( v => range[name][0]<v && v<range[name][1] );

    return <Histogram data={numbers}/>;

}


const sekme = {
    "filter": "filtre",
    "barands": "markalar",
    "pattern": "kalıp",
    "gym": "gym",
    "gymwear": "gym giyim",
    "swipe": "tasarımlar",
    "gender": "cinsiyet",
    "size": "beden",
    "fizique":"fizik",
    "income": "gelir",
    "location": "harita"    
}

interface Exlude {
    [key:string]:string[]
}

export default function Main() {

    const [data, setData] = useState(survay);
    const [questions, setQuestions] = useState({"filter":"commend", "barands":"Select", "pattern":"Select", "gym":"Pick", "gymwear":"Image", "swipe":"Swipe", "gender":"Pick", "size":"Pick", "fizique":"Histogram", "income":"Pick", "location":"Location"});
    const [currentQuest, setcurrentQuest] = useState("filter");

    const [selected, setSelected] = useState("yaş");
    const [excludes, setExcludes] = useState<Exlude>({});

    
    useEffect( () => {
        
        // AggregateChoiceData("Select", "barands"); // barands pattern
        // AggregateLocation()
    

    }, []);

    const filter = () => {
        
        setData( prevData => {
            prevData = prevData.filter( entry => {
                for ( let [key, value] of Object.entries(excludes) ) {
                    for(let v of value) 
                        if( !entry[key] || entry[key].includes(v) ) return false;
                }
                return true;
            })
            console.log(excludes, prevData);
            return [...prevData];
        })

    }

    const lookat = (key) => {

        if( ["barands", "pattern", "gym", "gymwear", "gender", "size", "income"].includes(key) ) return <AggregateChoiceData data={data} type={questions[key]} quest={key}/>
        else if( key == "swipe" ) return <AggregateLikeData data={data}/>;
        else if( key == "location" ) return <AggregateLocation data={data}/>;
        else if( ["fizique"].includes(key) ) return (
            <div>
                <div className={"flex justify-center items-center w-full text-center"}>
                    {["yaş", "boy", "kilo"].map( d => <div style={{ marginLeft: "12px", color: d==selected?"#fff":"#666" }} onClick={() => setSelected(d)}>{d}</div>)}
                </div>
                <AggregateNumerical data={data} name={selected} />
            </div>
        );
        else if(key == "filter") {
            return (
            <div className={'m-4 '}>
                <Filter data={["8.000 tl altı", "8.000 - 16.000 tl", "16.000 - 26.000 tl", "26.000 - 36.000 tl", "36.000 - 60.000 tl", "60.000 tl üzeri"]} onFilterd={v=>setExcludes( prevFilterby => {prevFilterby["income"] = v; return {...prevFilterby}})} ex={excludes["income"]}/>
                <Filter data={["Nike, Adidas, Under Armour", "h&m, Bershka, Pull&Bear", "DeFacto, LC Waikiki, Koton", "ZARA, Mango, Jack&Jones", "Calvin Klein, Hugo Boss"]} onFilterd={v=>setExcludes( prevFilterby => {prevFilterby["barands"] = v; return {...prevFilterby}})} ex={excludes["barands"]}/>
                <Filter data={["oversize", "normal fit", "boxy fit", "dar kalip"]} onFilterd={v=>setExcludes( prevFilterby => {prevFilterby["pattern"] = v; return {...prevFilterby}})} ex={excludes["pattern"]}/>
                <Filter data={["gidiyorum", "gitmeyi düşünüyorum", "gitmeyi düşünmüyorum"]} onFilterd={v=>setExcludes( prevFilterby => {prevFilterby["gym"] = v; return {...prevFilterby}})} ex={excludes["gym"]}/>
                <Filter data={["erkek", "kadın", "diğer"]} onFilterd={v=>setExcludes( prevFilterby => {prevFilterby["gender"] = v; return {...prevFilterby}})} ex={excludes["gender"]}/>
                <Filter data={["xS", "S", "M", "L", "xL", "xxL"]} onFilterd={v=>setExcludes( prevFilterby => {prevFilterby["size"] = v; return {...prevFilterby}})} ex={excludes["size"]}/>
                <button className={" rounded-md bg-stone-700 text-stone-200 px-3 py-2 m-1"} onClick={()=>{setExcludes({});setData(survay)}}>reset</button>
                <button className={" rounded-md bg-stone-700 text-stone-200 px-3 py-2 m-1"} onClick={filter}>uygula</button>
            </div>)
        }


    }
    
    return ( 
        <>
        <div className={'select-none p-4 mb-20 md:mb-8 text-neutral-500'}>
            {Object.keys(questions).map((link, index) => 
                <a key={"footer-"+index} onClick={()=>setcurrentQuest(link)} className={'my-1 mx-3 float-end'} style={{color:currentQuest==link?"#FFFFFF":"rgb(115 115 115)"}}>{sekme[link]}</a>
            )}
        </div>
        <div className={'overflow-scroll h-full flex items-center justify-center shadow-md backdrop-blur-md text-center select-none'}>
            {lookat(currentQuest)}
        </div>
        </>
    );
  }