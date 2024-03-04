'use client'

import Image from 'next/image';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";



const write = (text: string) => {
  const letters = text.split("");

  return (
    <div>
      {letters.map((letter, index) => (
        <motion.span key={index}
          className={"select-none text-center text-stone-100 font-mono text-lg"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: index * 0.04 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}

interface SwipeProps {
    images: string[],
    onNext: Function
}
  
const Swipe: React.FC<SwipeProps> = ({ images, onNext }) => {

    const [ likedList, setLikedList ] = useState<number[]>(images.map( e => 0 ));
    const [ display, setDisplay ] = useState(images);
    const [ thumbs, setThumbs ] = useState(0);

    
    const updatelist = (index, value) => {
      
      setThumbs(0);

      setLikedList( (prevLikedList) => {
        let newlist = prevLikedList;
        newlist[index] = value;
        console.log( prevLikedList, newlist );
        if( display.length==1 ) onNext(newlist);
        return newlist;
      });
      
      setDisplay( prevDisplay => prevDisplay.slice(0, index) );
    } 

    return (
    <>
    <div style={{position: "absolute", bottom: "12%", width:"100%", maxWidth: "500px", textAlign:"center", padding:"0px 8%", zIndex: 1000}}>
      {display.length== images.length && thumbs==0? write("beğendiğin tasarımları sağa beğenmediğin tasarımları sola kaydır"): write(display.length+" ")}
    </div>
    {thumbs!=0?
      <div style={{position: "absolute", bottom: "10%", height: '60px', width:"60px", textAlign:"center", zIndex: 1000}}>
      { 
        thumbs==1?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#7fd' d="M456 192l-156-12 23-89.4c6-26.6-.78-41.87-22.47-48.6l-34.69-9.85a4 4 0 00-4.4 1.72l-129 202.34a8 8 0 01-6.81 3.81H16V448h117.61a48 48 0 0115.18 2.46l76.3 25.43a80 80 0 0025.3 4.11h177.93c19 0 31.5-13.52 35.23-32.16L496 305.58V232c0-22.06-18-38-40-40z"/></svg>:
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#f7d' d="M56 320l156.05 12-23 89.4c-6.08 26.6.7 41.87 22.39 48.62l34.69 9.85a4 4 0 004.4-1.72l129-202.34a8 8 0 016.81-3.81H496V64H378.39a48 48 0 01-15.18-2.46l-76.3-25.43a80 80 0 00-25.3-4.11H83.68c-19 0-31.5 13.52-35.23 32.16L16 206.42V280c0 22.06 18 38 40 40z"/><path d="M378.45 273.93A15.84 15.84 0 01386 272a15.93 15.93 0 00-7.51 1.91zM337.86 343.22l-.13.22a2.53 2.53 0 01.13-.22c20.5-35.51 30.36-55 33.82-62-3.47 7.06-13.34 26.51-33.82 62z" fill="none"/><path d="M372.66 279.16l-1 2a16.29 16.29 0 016.77-7.26 16.48 16.48 0 00-5.77 5.26z"/></svg>
      }
      </div>: null
    }
    {display.map( (img:string, index:number) => 
      <motion.div key={"img-"+img}
        style={{position: "absolute", bottom: "27%"}}
        initial={{ opacity: 0, y: -70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: index * 0.05 }}
        drag="x" dragElastic dragSnapToOrigin
        dragConstraints={{left: -200, right: 200}}
        whileDrag={{ scale: 1.1 }}
        className={'shadow-lg rounded-lg overflow-x-clip select-none'}
        onDrag={ (event, info) => {
          setThumbs( info.offset.x>0? 1:-1 );
          if ( info.offset.x>220 ) 
            updatelist(index, 1);
          else if ( info.offset.x < -220 )
            updatelist(index, -1);
        }}
        onDragEnd={ (event, info) => {
          if ( info.offset.x>120 ) 
            updatelist(index, 1);
          else if ( info.offset.x < -120 )
            updatelist(index, -1);
        }
      }
      >
        <img draggable="false" className={'object-cover rounded-lg h-96 w-72'} src={img} alt="swipe"/>
      </motion.div>
      )
    }
    </>
    )
};  

export default Swipe;