import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white sm:h-31 h-40'>
            <div className='flex justify-around items-center'>
                <div className='logo font-bold text-white md:text-2xl'>
                    <span className='text-green-500'> &lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </div>
                <div>
                    <h2 className='font-bold'>Company</h2>
                    <ul>
                    <li className='flex flex-col'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="/">About Us</a>
                        <a className='hover:font-bold' href="/">Contact</a>
                    </li>
                </ul>
                </div>
            </div>
            <div className='text-center'>Copyright 2025@ eCart.com - All Rights are Reserved.</div>
        </div>
    )
}

export default Footer
