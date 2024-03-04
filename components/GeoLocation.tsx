'use client'

import Image from 'next/image';
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



interface GeoLocationProps {
    onNext: Function
}
  
const GeoLocation: React.FC<GeoLocationProps> = ({ onNext }) => {
    
    const [country, setCountry] = useState("Türkiye");
    const [Postalcode, setPostalcode] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    

    const validate = () => {
        document.getElementById("fill-country")?.style.setProperty('box-shadow', 'none');
        document.getElementById("fill-height")?.style.setProperty('box-shadow', 'none');
        document.getElementById("fill-age")?.style.setProperty('box-shadow', 'none');
        if( country =='' ) {
          document.getElementById("fill-country")?.style.setProperty('box-shadow', '0px 0px 5px #fca5a5aa');
        } else if( Postalcode.length != 5 ) {
            if( city.length>0 && region.length>0 ) onNext({"country": country, "city": city, "region": region});
            else document.getElementById("fill-postal")?.style.setProperty('box-shadow', '0px 0px 5px #fca5a5aa');
        } else {
            onNext({"country": country, "post": Postalcode});
        }
        
    }



    return (
      <motion.div
        className={'flex flex-col justify-center items-center w-full h-full'}
        variants={container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        exit={{ x: -300 }}
      >
        <motion.input id={"fill-country"} key={"fill-country"}
          onChange={ e => setCountry(e.target.value) }
          placeholder={"ülke"}
          variants={item}
          value={country}
          whileHover={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileFocus={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileTap={{ opacity: 0.5 }}
          className={'box m-1.5 p-4 w-full shadow-md text-center font-mono text-stone-100 text-lg backdrop-blur-md bg-stone-800 rounded-md opacity-80 select-none'}
        ></motion.input>

        <motion.input id={"fill-postal"} key={"fill-postal"}
          onChange={ e => setPostalcode(e.target.value.slice(-5)) }
          value={Postalcode}
          placeholder={"posta kodu"}
          variants={item}
          type="number"
          whileHover={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileFocus={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileTap={{ opacity: 0.5 }}
          className={'box m-1.5 p-4 w-full shadow-md text-center font-mono text-stone-100 text-lg backdrop-blur-md bg-stone-800 rounded-md opacity-80 select-none'}
        ></motion.input>

        <div className={'h-12 w-full flex justify-center items-center text-stone-200 z-50'}> - veya - </div>
        
        <motion.input id={"fill-city"} key={"fill-city"}
          onChange={ e => setCity(e.target.value) }
          placeholder={"il"}
          variants={item}
          value={city}
          whileHover={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileFocus={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileTap={{ opacity: 0.5 }}
          className={'box m-1.5 p-4 w-full shadow-md text-center font-mono text-stone-100 text-lg backdrop-blur-md bg-stone-800 rounded-md opacity-80 select-none'}
        >
        </motion.input>
        <motion.input id={"fill-region"} key={"fill-region"}
          onChange={ e => setRegion(e.target.value) }
          placeholder={"ilçe semt"}
          variants={item}
          whileHover={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileFocus={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileTap={{ opacity: 0.5 }}
          className={'box m-1.5 p-4 w-full shadow-md text-center font-mono text-stone-100 text-lg backdrop-blur-md bg-stone-800 rounded-md opacity-80 select-none'}
        >
        </motion.input>
        
        <motion.button key={"fill-submit"}
          onTap={ () => validate() }
          variants={item}
          whileHover={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
          whileTap={{ opacity: 0.5 }}
          className={'m-1.5 p-4 w-full shadow-md text-center font-mono text-stone-100 text-lg backdrop-blur-md bg-stone-800 rounded-md opacity-80 select-none'}
        >
          next
        </motion.button>
      </motion.div>
    )
};  

export default GeoLocation;