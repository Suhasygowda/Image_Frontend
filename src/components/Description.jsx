import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion';

const Description = () => {
  return (
    <motion.div 
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true}}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your imaginations into visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg '/>
        <div className=''>
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Image Generator</h2>
            <p className='text-gray-600 mb-4'>Simply describe what you envision — whether it's a serene landscape, a futuristic city, or a magical creature — and let our AI understand and interpret your words with precision.</p>
            <p className='text-gray-600'>Our powerful AI engine transforms your text into visually stunning images within seconds, helping you bring ideas to life effortlessly, whether for creative projects, presentations, or pure inspiration.</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
