'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export const SignOut = () => {
    const router = useRouter()

    const onSignOut = () => {
        document.cookie = 'token=; Max-Age=0; path=/;'
        router.push('/login')
    }

    return (
        <Button
            variant='outline'
            size='sm'
            onClick={onSignOut}
            className='flex items-center justify-between text-lg text-secondary max-lg:justify-center max-lg:[&>span]:hidden'>
            <span> Вихід</span>
            <LogOut className='size-4 flex-shrink-0' />
        </Button>
    )
}
