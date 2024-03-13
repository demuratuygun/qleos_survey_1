'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";



const write = (text: string) => {
  const letters = text.split("");
  return (
    <div style={{ zIndex: 1000 }}>
      {letters.map((letter, index) => (
        <motion.span key={index}
          className={"select-none text-center text-stone-100 font-mono text-lg"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: index * 0.04 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}


interface SelectProps {
    question: string, 
    options: string[],
    selectNumber:number,
    onNext: Function
}
  
const PickImage: React.FC<SelectProps> = ({ question, options, selectNumber, onNext }) => {

    const [ selecteds, setSelecteds ] = useState<number[]>([]);


    return (
      <div className={'flex flex-col justify-center items-center w-full h-full'}>
        <div className={"min-h-10 text-center m-2 pb-2 z-50"}>{write(question)}</div>
        <div className={'mt-4 grid grid-cols-2 gap-4'}>
        {
          options.map( (option:string, index:number) =>
            <motion.div key={"image-select-"+index} className={'shadow-md backdrop-blur-md bg-stone-800/60 rounded-lg opacity-80 select-none'} 
                initial={{ opacity: 0, y: 20, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2, delay: 2+(0.2*index) }}
                whileTap={{ opacity: 0.5 }}
                onTap={() => setSelecteds( prevSelected => {
                    if( selectNumber == 1 ) onNext(index);
                    if (selecteds.includes(index)) return selecteds.filter(s => s!=index);
                    if (selecteds.length >= selectNumber) return [...prevSelected.slice(1), index];
                    return [...prevSelected, index];
                })}>
                <img key={"image-option-"+index}
                    style={{filter: "grayscale(10%)"}}
                    className={'shadow-md object-cover rounded-lg h-52 w-44 select-none'}
                    draggable="false" src={option} alt="swipe"
                    
                />
            </motion.div>
          )
        }
        </div>
      </div>
    );
};
  
export default PickImage;