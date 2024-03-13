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
  
const Select: React.FC<SelectProps> = ({ question, options, selectNumber, onNext }) => {

    const [ selecteds, setSelecteds ] = useState<string[]>([]);
    const optionsDelay = question.length * 0.05;

    return (
      <motion.div key={question}
        className={'flex flex-col justify-center items-center w-full h-full'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        exit={{ x: -300 }}
      >
        <div className={"min-h-10 text-center m-2 pb-2 z-50"}>{write(question)}</div>
        {
          options.map( (option:string, index:number) =>
            <motion.button key={"option-"+option}
              style={selecteds.includes(option)? { backgroundColor: "rgb(68, 64, 60)", color: "rgb(250, 250, 249)" } : {backgroundColor: "rgb(41, 37, 36)", color: "rgb(245, 245, 244)"}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: optionsDelay+(0.1*index) }}
              onTap={() => setSelecteds( prevSelected => {
                if (selecteds.includes(option)) return selecteds.filter(s => s!=option);
                if (selecteds.length >= selectNumber) return [...prevSelected.slice(1), option];
                return [...prevSelected, option];
              })}
              whileTap={{ opacity: 0.5 }}
              className={'m-1.5 p-4 w-full shadow-md text-center text-stone-100 bg-stone-800 font-mono text-sm backdrop-blur-md rounded-md opacity-80 select-none md:text-lg'}
            >
              {option}
            </motion.button>
            )
        }
        <motion.button key={"option-submit"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: optionsDelay+(0.1*options.length) }}
          disabled={selecteds.length < selectNumber}
          onTap={() => {if(selecteds.length >= selectNumber) {setSelecteds([]);onNext(selecteds);}}}
          whileHover={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileTap={{ opacity: 0.5 }}
          className={'m-1.5 p-4 mt-4 w-full shadow-md text-center font-mono text-sm bg-stone-800 backdrop-blur-md rounded-md opacity-80 select-none md:text-lg'}
        >
          {selecteds.length < selectNumber? 
            <span style={{color: "rgb(225, 140, 140)"}}>{selectNumber+" tane seç"}</span>: 
            <span style={{color: "rgb(220, 255, 236)"}}>devam</span>
          }
        </motion.button>
      </motion.div>
    );
};
  
export default Select;