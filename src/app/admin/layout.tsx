import { SideBar } from './components/sidebar'
import { Toaster } from '@/components/ui/sonner'

const AdminLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            <div className='flex h-screen items-start justify-center gap-x-6 p-6'>
                <SideBar />
                <main className='min-h-full w-full rounded-3xl border'>{children}</main>
            </div>
            <Toaster
                duration={5000}
                closeButton
            />
        </>
    )
}

export default AdminLayout
