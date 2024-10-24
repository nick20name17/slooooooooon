import { Toaster } from "@/components/ui/sonner";
import { SideBar } from "./components/sidebar";

const AdminLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            <div className="flex max-lg:h-auto h-screen items-start justify-center gap-6 p-6 w-full max-lg:flex-col max-md:p-4">
                <SideBar />
                <main className="max-h-full h-full w-full rounded-3xl border ">
                    {children}
                </main>
            </div>
            <Toaster duration={5000} closeButton />
        </>
    );
};

export default AdminLayout;
