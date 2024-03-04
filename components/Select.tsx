'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
};
 

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

    return (
      <motion.div key={question}
        className={'flex flex-col justify-center items-center w-full h-full'}
        variants={container}
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
              onTap={() => setSelecteds( prevSelected => {
                if (selecteds.includes(option)) return selecteds.filter(s => s!=option);
                if (selecteds.length >= selectNumber) return [...prevSelected.slice(1), option];
                return [...prevSelected, option];
              })}
              variants={item}
              whileTap={{ opacity: 0.5 }}
              className={'m-1.5 p-4 w-full shadow-md text-center text-stone-100 bg-stone-800 font-mono text-sm backdrop-blur-md rounded-md opacity-80 select-none md:text-lg'}
            >
              {option}
            </motion.button>
            )
        }
        <motion.button key={"option-submit"}
          style={ selecteds.length < selectNumber? 
            {backgroundColor: "rgb(28 25 23)", color: "rgb(250, 250, 249)"}
            :{backgroundColor: "rgb(68, 64, 60)", color: "rgb(250, 250, 249)"}
          }
          disabled={selecteds.length < selectNumber}
          onTap={() => {if(selecteds.length >= selectNumber) {setSelecteds([]);onNext(selecteds);}}}
          variants={item}
          whileHover={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileTap={{ opacity: 0.5 }}
          className={'m-1.5 p-4 mt-4 w-full shadow-md text-center font-mono text-sm backdrop-blur-md rounded-md opacity-80 select-none md:text-lg'}
        >
          {selecteds.length < selectNumber? selectNumber+" tane seç": 'devam'}
        </motion.button>
      </motion.div>
    );
};
  
export default Select;