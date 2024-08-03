import React from 'react'
import Container from '../Container'
import Link from 'next/link'
import { FcCableRelease } from 'react-icons/fc'
import CartCount from './CartCount'
import UserMenu from './UserMenu'
import { getCurrentUser } from '../../../../actions/getCurrentUser'





export default async function NavBar() {
  const currentUser = await getCurrentUser()
  //console.log("user<<<",currentUser)
  return (
    <div className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm opacity-90'>
       <div className="py-4 border-b-[1px]">
        <Container>
         <div className="flex items-center justify-between gap-3 md:gap-12">
            <Link href='/' className='text-gray-500  md:text-2xl text-sm font-semibold flex items-center gap-2'>
            <FcCableRelease className=''/>
            Electronic Shop
            </Link>
            <div className="hidden md:block">
                Search
                </div>
            <div className="flex items-center gap-8 md:gap-12">
                <CartCount/>
                <UserMenu currentUser={currentUser} />
            </div>
            </div>   
        </Container>
       </div>
    </div>
  )
}

