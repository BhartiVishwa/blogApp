import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto text-center sm:text-left">
        
        {/* Logo */}
        <Image src={assets.logo_light} alt="logo" width={120} />

        {/* Copyright */}
        <p className="text-sm">
          © 2025 Blogger. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-3">
          <Image
            src={assets.facebook_icon}
            alt="facebook"
            width={35}
            className="transition-transform duration-500 hover:rotate-y-180 cursor-pointer"
          />
          <Image
            src={assets.twitter_icon}
            alt="twitter"
            width={35}
            className="transition-transform duration-500 hover:rotate-y-180 cursor-pointer"
          />
          <Image
            src={assets.googleplus_icon}
            alt="google plus"
            width={35}
            className="transition-transform duration-500 hover:rotate-y-180 cursor-pointer"
          />
        </div>

      </div>
    </footer>
  )
}

export default Footer



// import { assets } from '@/Assets/assets'
// import Image from 'next/image'
// import React from 'react'

// const Footer = () => {
//   return (
//     <div className='flex justify-around gap-2  sm:gap-0 sm-flex-row bg-black py-5 item-center'>
//         <Image src={assets.logo_light} alt='' width={120}/>
//         <p className='text-sm text-white'>All right reversed. copyright @blogger</p>
//         <div className='flex gap-3 perspective'>
//             <Image src={assets.facebook_icon} alt='' width={40} className="transition-transform duration-500 hover:rotate-y-180 cursor-pointer"/>
//             <Image src={assets.twitter_icon} alt='' width={40} className="transition-transform duration-500 hover:rotate-y-180 cursor-pointer"/>
//             <Image src={assets.googleplus_icon} alt='' width={40} className="transition-transform duration-500 hover:rotate-y-180 cursor-pointer"/>
//         </div>
//     </div>
//   )
// }

// export default Footer