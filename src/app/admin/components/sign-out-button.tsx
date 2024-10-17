'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { clientApi } from '@/api/client'
import { Button } from '@/components/ui/button'

export const SignOut = () => {
    const router = useRouter()

    const onSignOut = async () => {
        await clientApi('/api-token-logout/', {
            method: 'POST'
        })

        document.cookie.split(';').forEach((cookie) => {
            const eqPos = cookie.indexOf('=')
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
        })

        router.replace('/login')
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
