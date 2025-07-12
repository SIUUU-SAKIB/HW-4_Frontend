import React from 'react'
// import heroImg from "../assets/pexels-pixabay-159711.jpg"
const Hero: React.FC  = () => {
  return (
    <div className='relative min-h-[600px] flex items-center justify-center'>
        <div className='absolute inset-0 bg-cover bg-center bg-[url("https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg")]'>

{/* overlay */}
<div className='absolute inset-0 bg-black/30'></div>
         {/* TEXT-DIV */}
        <div className='flex flex-col items-center gap-4 md:gap-12 py-16 '>
            <p className='text-2xl text-white font-bold text-primary-font z-10'>Hey There</p>
            <p className='text-6xl text-center text-white font-bold font-primary z-10'>Unlock Knowledge, One Page at a Time</p>
            <p className='text-xl text-center leading-[1.2] text-white z-10 text-shadow-xl bg-black/20 py-2 font-secondary max-w-[800px] md:text-2xl'>Discover a world of stories, research, and resources. Our digital library gives you seamless access to books, journals, and learning tools—anytime, anywhere. Whether you're a curious reader or a dedicated student, your next chapter begins here.</p>
        </div>
        </div>
       
        
    </div>
  )
}
// className={`flex flex-col items-center space-y-16 bg-[url("https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg")] min-h-[600px] bg-cover bg-center md:bg-${heroImg}`}
export default Hero