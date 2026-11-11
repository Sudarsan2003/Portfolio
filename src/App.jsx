import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import Technologies from './components/Technologies'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Education from './components/Education'
import FeaturedProject from './components/FeaturedProject'
import ScrollProgress from './components/ScrollProgress'

const App = () => {
  return (
    <div className='overflow-x-hidden bg-[var(--bg)] text-[var(--ink)] antialiased selection:bg-violet-600 selection:text-white'>
      <div className='fixed top-0 -z-10 h-full w-full'>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[var(--bg)] bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(124,58,237,0.14),rgba(255,255,255,0)),radial-gradient(ellipse_60%_50%_at_85%_10%,rgba(124,58,237,0.08),rgba(255,255,255,0))]"></div>
      </div>
      <div className='container mx-auto px-8'>
        <ScrollProgress/>
        <Navbar/>
        <section id="home"><Hero/></section>
        <section id="about" className="scroll-mt-24"><AboutMe/></section>
        <Technologies/>
        <section id="education" className="scroll-mt-24"><Education/></section>
        <section id="learnmate" className="scroll-mt-24"><FeaturedProject/></section>
        <section id="projects" className="scroll-mt-24"><Projects/></section>
        <section id="contact" className="scroll-mt-24"><Contact/></section>
      </div>
    </div>
  )
}

export default App