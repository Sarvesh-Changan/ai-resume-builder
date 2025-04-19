import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'


function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
             <Link to={'/https://ai-resume-builder-h44c87whk-sarveshs-projects-50718d97.vercel.app/'}>
            <img src='/jobLogo.png' className='cursor-pointer' width={100} height={100} />
            </Link>
            {isSignedIn ?
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button className='bg-[#2B547E] hover:bg-[#1E3A5A]'>Get Started</Button>
                </Link>
            }

        </div>
    )
}

export default Header
