import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user.actions";


const page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    //clerk user data
    const user = await currentUser();
    if (!user) return null;

    //user data froom database
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    return (
        <>
            <h1 className='head-text'>Communities</h1>

            
        </>
    )
}

export default page