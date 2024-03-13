import { useEffect } from "react";

import Main from "../../components/results/main";



// κλέος Ϙλέος
function Header() {
  return (
    <div>
      <div className='brandname'>qleos</div>
    </div>
  )
} 

function Footer() {
  return (
    <div className={'select-none p-4 mb-24 md: mb-8'}>
      {['contact', 'purchase info', 'terms of service', 'privacy policy', 'company', 'newsletter', 'instagram'].map(
        (link, index) => <a key={"footer-"+index} className={'my-1 mx-3 float-start text-neutral-500 hover:text-white'}>{link}</a> )
      }
    </div>
  )
}


export default function Home() {

  return (
  <>
    <Header/>
      <div className={'w-full h-screen bg-neutral-900 text-white relative pt-20 md:pt-5'}>
        <Main />
      </div>
    
  </>
    
  );
}
