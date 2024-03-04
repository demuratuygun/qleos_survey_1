'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Select from "./Select";
import Swipe from "./Swipe";
import GeoLocation from "./GeoLocation";
//import { add } from '../app/store';



import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);




export async function add(client:string, register:any) {
    try {
        console.log(typeof db, client, register)
        if (!db) throw new Error("Firestore is not initialized");
        return await setDoc(doc(db, "survay1", client), register);

    } catch (e) {
        console.error("Error adding document: ", e);
    }

}





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
    <div>
      {letters.map((letter, index) => (
        <motion.span
          className={"select-none text-center text-stone-100 font-mono text-lg"}
          key={index}
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


const options = ( options:string[], onNext:Function ) => 
  options.map( (option:string, index:number) =>
    <motion.button key={"option-"+option}
      onTap={() => onNext(option)}
      variants={item}
      whileHover={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
      whileTap={{ opacity: 0.5 }}
      className={'m-1.5 p-4 w-full shadow-md text-center text-stone-100 bg-stone-800 font-mono text-sm backdrop-blur-md rounded-md opacity-80 select-none  md:text-lg'}
    >
      {option}
    </motion.button>
);

const pick = ( question:string, optionlist:string[], onNext:Function ) => (
    <motion.div key={question}
      className={'flex flex-col justify-center items-center w-full h-full'}
      variants={container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 1 }}
      exit={{ x: -300 }}
    >
      <div className={"min-h-10 z-50"}>{write(question)}</div>
      {options( optionlist, onNext )}
    </motion.div>
)

const fill = ( question:string, filllist:string[], type:string, inputUpdate:Function, onNext:Function ) => {
  
  return(
    <motion.div key={question}
      className={'flex flex-col justify-center items-center w-full h-full'}
      variants={container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 1 }}
      exit={{ x: -300 }}
    >
      <div className={"min-h-10 z-50"}>{write(question)}</div>
      {
      filllist.map( (pholder:string) => 
      <motion.input id={"fill-"+pholder} key={"fill-"+pholder}
        onChange={ e => inputUpdate(e, pholder) }
        type={type}
        placeholder={pholder}
        variants={item}
        whileHover={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
        whileFocus={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
        whileTap={{ opacity: 0.5 }}
        className={'box m-1.5 p-4 w-full shadow-md text-center font-mono text-stone-100 text-lg backdrop-blur-md bg-stone-800 rounded-md opacity-80 select-none'}
      >
      </motion.input>
      )}
      <motion.button key={"fill-submit"}
        onTap={() => onNext("submit")}
        variants={item}
        whileHover={{ backgroundColor: 'rgb(68 64 60)', color: 'rgb(250 250 249)' }}
        whileTap={{ opacity: 0.5 }}
        className={'m-1.5 p-4 w-full shadow-md text-center font-mono text-stone-100 text-lg backdrop-blur-md bg-stone-800 rounded-md opacity-80 select-none'}
      >
        next
      </motion.button>
    </motion.div>
  )
}


export default function Survay() {

    const [step, setStep] = useState(-1);
    const [clientID, setClientID] = useState<string>();
    const [inputs, setInputs] = useState<{[key:string]:any}>({date: new Date()});
  

    useEffect(() => {

      let clientid = localStorage.getItem("client");
      if( !clientid ) {
        clientid = Date.now()+("-"+Math.floor(Math.random() * 10000)).padStart(5, "0");
        localStorage.setItem("client", clientid );
      }
      setClientID(clientid);
      
      setTimeout( () => setStep(0), 1400);

      const handlePopstate = (event) => setStep(prevStep => prevStep-1);
      window.addEventListener('popstate', handlePopstate);

      return () => {
        window.removeEventListener("mousemove", handlePopstate);
      }

    }, [])


    const inputUpdate = (e:React.ChangeEvent<HTMLInputElement>, pholder:string) => setInputs( prevInputs => {
      var list:{[key:string]:string} = prevInputs;
      list[pholder] = e.target.value;
      return list;
    })

    const onNext = (answer:any) => {
      
      if(step==0) setInputs( prevInputs => {
        var list:{[key:string]:any} = prevInputs;
        list["barands"] = answer;
        if( clientID ) add(clientID, list);
        return list;
      })
      else if(step==1) setInputs( prevInputs => {
        var list:{[key:string]:any} = prevInputs;
        list["pattern"] = answer;
        if( clientID ) add(clientID, list);
        return list;
      })
      else if(step==2) setInputs( prevInputs => {
        var list:{[key:string]:any} = prevInputs;
        list["swipe"] = answer;
        if( clientID ) add(clientID, list);
        return list;
      })
      else if(step==3) setInputs( prevInputs => {
        var list:{[key:string]:any} = prevInputs;
        list["gender"] = answer;
        if( clientID ) add(clientID, list);
        return list;
      })
      else if(step==4) setInputs( prevInputs => {
        var list:{[key:string]:any} = prevInputs;
        list["size"] = answer;
        if( clientID ) add(clientID, list);
        return list;
      })
      else if(step==5) {
        document.getElementById("fill-boy")?.style.setProperty('box-shadow', 'none');
        document.getElementById("fill-kilo")?.style.setProperty('box-shadow', 'none');
        document.getElementById("fill-yaş")?.style.setProperty('box-shadow', 'none');
        var vaild = true;
        if( !inputs["boy"] || inputs["boy"]=="" ) {
          document.getElementById("fill-boy")?.style.setProperty('box-shadow', '0px 0px 5px #fca5a5aa');vaild = false;
        } if( !inputs["kilo"] || inputs["kilo"]=="" ) {
          document.getElementById("fill-kilo")?.style.setProperty('box-shadow', '0px 0px 5px #fca5a5aa');vaild = false;
        } if( !inputs["yaş"] || inputs["yaş"]=="" ) {
          document.getElementById("fill-yaş")?.style.setProperty('box-shadow', '0px 0px 5px #fca5a5aa');vaild = false;
        }
        if( !vaild ) return;
        else if( clientID ) add(clientID, inputs);
      }
      else if(step==6) setInputs( prevInputs => {
        var list:{[key:string]:any} = prevInputs;
        list["gym"] = answer;
        if( clientID ) add(clientID, list);
        return list;
      })
      else if(step==7) setInputs( prevInputs => {
        var list:{[key:string]:any} = prevInputs;
        list["income"] = answer;
        if( clientID ) add(clientID, list);
        return list;
      })
      else if(step==8) {
        document.getElementById("fill-email")?.style.setProperty('box-shadow', 'none');
        if( !inputs["email"] || inputs["email"]=="" ) {
          document.getElementById("fill-email")?.style.setProperty('box-shadow', '0px 0px 5px #fca5a5aa');
          return;
        } else if( clientID ) add(clientID, inputs);
      }
      else if(step==9) setInputs( prevInputs => {
        var list:{[key:string]:any} = prevInputs;
        list["location"] = answer;
        if( clientID ) add(clientID, list);
        return list;
      })
      
      history.pushState({question: step+1}, "");
      setStep( prevStep => prevStep+1 );

    }

    

    return (
      <motion.div className={'p-8 flex flex-col justify-center items-center w-full h-full overflow-hidden'} 
        initial={{ backgroundColor: "#0000" }}
        animate={{ backgroundColor: "#0009" }}
        transition={{ duration: 3, delay: 1 }}
      >
        <div className={'flex justify-center items-center w-full h-full md:max-w-md overflow-hidden'}>
        {
        step==0? <Select question={"en çok alışveriş yaptığın marka grupları"} options={["Nike, Adidas, Under Armour", "h&m, Bershka, Pull&Bear", "DeFacto, LC Waikiki, Koton", "ZARA, Mango, Jack&Jones", "Calvin Klein, Hugo Boss"]} selectNumber={2} onNext={onNext}/>:
        step==1? <Select question={"tercih ettiğin kalıplar"} options={["oversize", "normal fit", "boxy fit", "dar kalip" ]} selectNumber={2} onNext={onNext}/>:
        step==2? <Swipe images={[
          "https://i.ibb.co/p2Nskzj/1ebc8be8683ee90705156e4f3ccf5366.jpg",
          "https://i.ibb.co/27y1Zqp/3ef2fac50767cc77f5e98d98a423262d.jpg",
          "https://i.ibb.co/frgmZfm/9bf089e47ec773952d623e461d7237bd.jpg",
          "https://i.ibb.co/WnnKHFJ/98aca446b43a1829c2245bbde9384faa.jpg",
          "https://i.ibb.co/YQ2t3kj/764efee29b1d4abf75e0adaf9295fca6.jpg",
          "https://i.ibb.co/GTvpCSc/2376c5e7b311df74883a432460cea6cd.jpg",
          "https://i.ibb.co/6gxH4R2/7028b3c9c6b0d1ed87f70a14fbca629c.jpg",
          "https://i.ibb.co/DgKdSDY/8213d8bccb4ad0f8e2d4513d01b7641c.jpg",
          "https://i.ibb.co/T0YJpRX/Screenshot-2024-02-27-at-18-55-56.png",
          "https://i.ibb.co/SnXy86x/72704d7798336d1f9200dcb96f5714c9.jpg",
          "https://i.ibb.co/R0tP8Qy/7393873774b0eb9520966bba70a9ed68.jpg",
          "https://i.ibb.co/ChS794H/a4013841e82f2752865413fd2ba5b07a.jpg",
          "https://i.ibb.co/pLTzmcK/b35f86f606d6f25c2feeb4085624ac8d.jpg",
          "https://i.ibb.co/XzRGq3C/b76a1681c6ed183d7a152f84af57684e.jpg",
          "https://i.ibb.co/pj4bLj1/ce127cd24d3b6292e3ccf76925647877.jpg",
          "https://i.ibb.co/qd2rSSJ/de89a68ea0df1d3562c49dcaa728f04b.jpg",
          "https://i.ibb.co/3Y5t9Q3/f49aa321a271fcac5749dd9c8365105b.jpg",
          "https://i.ibb.co/wN4271p/Kol-Do-vmeleri.jpg"
        ]} onNext={onNext}/>:
        step==3? pick("cinsiyet", ["erkek", "kadın", "diğer"], onNext):
        step==4? pick("beden", ["xS", "S", "M", "L", "xL", "xxL"], onNext):
        step==5? fill("fizik", ["boy", "kilo", "yaş"], "number", inputUpdate, onNext):
        step==6? pick("GYM'e gidiyor musun", ["şuan gidiyorum", "gitmeyi düşünüyorum", "gitmeyi düşünmüyorum"], onNext):
        step==7? pick("aylık gelir aralığı", ["8.000 tl altı", "8.000 - 16.000 tl", "16.000 - 26.000 tl", "26.000 - 36.000 tl", "36.000 - 60.000 tl", "60.000 tl üzeri"], onNext):
        step==8? fill("iletişim bilgileri", ["email"], "text", inputUpdate, onNext):
        step==9? <GeoLocation onNext={onNext}/> :
        step==10? <div style={{textAlign:"center"}}>{write(`katılımınız için teşekkür ederiz. info@qleos.com adresinden bizimle iletişime geçebilirsiniz.`)}</div>:
        null}
        </div>
        
      </motion.div>
        
    );
  }



