import Survay from "../components/Survay";



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
    <div className={'w-full h-screen bg-neutral-900 text-white relative'}>
      
      <video  autoPlay muted loop 
        style={{ objectFit: "cover", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex:0 }}>
        <source src="https://cdn.qleos.com/fswu5d_1.webm" type="video/webm" style={{zIndex:0}}/>
      </video>
      
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex:600 }}>
        <Survay />
      </div>
      
      

    </div>
    
  </>
    
  );
}
