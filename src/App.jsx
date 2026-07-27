import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import Technologies from './components/Technologies'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'

const App = () => {
  return (
    <div className='overflow-x-hidden bg-[var(--bg)] text-[var(--ink)] antialiased selection:bg-violet-600 selection:text-white'>
      <div className='fixed top-0 -z-10 h-full w-full'>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[var(--bg)] bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(124,58,237,0.14),rgba(255,255,255,0)),radial-gradient(ellipse_60%_50%_at_85%_10%,rgba(124,58,237,0.08),rgba(255,255,255,0))]"></div>
      </div>
      <div className='container mx-auto px-8'>
        <Navbar/>
        <section id="home"><Hero/></section>
        <section id="about"><AboutMe/></section>
        <Technologies/>
        <section id="education"><Education/></section>
        <section id="projects"><Projects/></section>
        <section id="contact"><Contact/></section>
      </div>
    </div>
  )
}

export default App