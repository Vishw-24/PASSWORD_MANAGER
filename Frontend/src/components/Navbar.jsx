import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-10 h-14">

                <div className='logo font-bold text-white md:text-2xl'>
                    <span className='text-green-500'> &lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </div>
                <ul>
                    <li className='flex gap-4 text-xl hidden sm:inline-flex'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="/">About Us</a>
                        <a className='hover:font-bold' href="/">Contact</a>
                    </li>
                </ul>
                <Menu as="div" className="relative sm:hidden inline-block text-left">
                    <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md cursor-pointer bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                            Manu
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>
                    </div>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    <a className='hover:font-bold' href="/">Home</a>
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                >
                                    <a className='hover:font-bold' href="/">About Us</a>
                                </a>
                            </MenuItem>
                            <form action="#" method="POST">
                                <MenuItem>
                                    <button
                                        type="submit"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        <a className='hover:font-bold' href="/">Contact</a>
                                    </button>
                                </MenuItem>
                            </form>
                        </div>
                    </MenuItems>
                </Menu>
                <button className='text-white bg-green-500 my-5 outline-2 outline-white rounded-full flex gap-2 justify-between font-bold p-1.5 cursor-pointer items-center'>
                    <img className='w-7 bg-white rounded-full p-1' src="icons/github-sign.png" alt="" />
                    GitHub
                </button>
            </div>
        </nav>
    )
}

export default Navbar
