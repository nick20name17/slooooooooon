import { getUser } from "@/api/users/users";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserRound } from "lucide-react";
import { cookies } from "next/headers";
import { PasswordForm } from "./components/password-form";
import { ProfileForm } from "./components/profile-form";

export const metadata = {
    title: "Профайл",
};

const Profile = async () => {
    const userId = cookies().get("userId")?.value || "";

    const user = await getUser(+userId);

    return (
        <>
            <div className="flex items-center justify-between border-b flex-wrap gap-6 p-5 max-md:p-4 max-md:gap-4">
                <div className="flex items-center gap-x-4">
                    <div className="flex size-8 items-center justify-center rounded-sm bg-profile">
                        <UserRound className="size-6" />
                    </div>
                    <h1 className="text-4xl max-md:text-3xl font-bold">
                        Профайл
                    </h1>
                </div>
            </div>
            <div className="flex flex-col gap-y-7 p-5">
                <div className="flex items-center gap-x-5">
                    <div className="rounded-full size-24 border border-profile flex items-center justify-center shadow-[3px_4px_0px_0px_#2F2E65]">
                        <svg
                            width="56"
                            height="56"
                            viewBox="0 0 56 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M28 4.66797C39.5981 4.66797 49 14.07 49 25.668V43.168C49 47.6783 45.3437 51.3346 40.8333 51.3346C38.0336 51.3346 35.563 49.9258 34.0916 47.7786C32.8944 49.9013 30.6145 51.3346 28 51.3346C25.3855 51.3346 23.1056 49.9013 21.9037 47.7772C20.4369 49.9258 17.9663 51.3346 15.1667 51.3346C10.8067 51.3346 7.2447 47.9179 7.01209 43.616L7 43.168V25.668C7 14.07 16.402 4.66797 28 4.66797ZM37.3333 30.3346H32.6667C32.6667 32.912 30.5774 35.0013 28 35.0013C25.5397 35.0013 23.5242 33.0975 23.3462 30.683L23.3333 30.3346H18.6667L18.6781 30.8004C18.9208 35.7386 23.0015 39.668 28 39.668C32.9985 39.668 37.0792 35.7386 37.3219 30.8004L37.3333 30.3346ZM28 16.3346C25.4226 16.3346 23.3333 18.424 23.3333 21.0013C23.3333 23.5787 25.4226 25.668 28 25.668C30.5774 25.668 32.6667 23.5787 32.6667 21.0013C32.6667 18.424 30.5774 16.3346 28 16.3346Z"
                                fill="#5E5CE6"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-y-0.5 font-bold">
                        <h2 className="text-[32px]">
                            {user.last_name + " " + user.first_name}
                        </h2>
                        <div className="text-foreground/60 text-lg">
                            {user.email}
                        </div>
                    </div>
                </div>

                <ScrollArea className="h-[500px] pr-1">
                    <ProfileForm user={user} />
                    <PasswordForm user={user} />
                </ScrollArea>
            </div>
        </>
    );
};

export default Profile;
