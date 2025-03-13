import React from 'react'
import logo from '../assets/logo.png';
import {FaLinkedin} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa'
import { FaSquareXTwitter } from "react-icons/fa6";
import {FaInstagram} from 'react-icons/fa'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return <nav className='mb-20 flex items-center justify-between py-6'>
    <div className=' flex flex-shrink-0 items-center '>
        <img className='mx-2 w-20 rounded-full object-cover bg-blend-multiply' src={logo} alt=''/>
    </div>
    <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
      <a 
      href='https://www.linkedin.com/in/lvn-manikantha-sudarshan-annaluru-010717210/ '
      target="_blank"
      rel="noopener noreferrer"
      ><FaLinkedin/></a>
        
        <a
        href='https://github.com/Sudarsan2003'
        target="_blank"
        rel="noopener noreferrer"
        ><FaGithub/></a>
        <FaInstagram/>
        <FaSquareXTwitter/>
    </div>

  </nav>
}

export default Navbar