import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

import ThreadCard from "@/components/cards/ThreadCard";


const Page = async ({ params }: { params: { id: string } }) => {

    if (!params.id) return null;
    
    //clerk user
    const user = await currentUser();
    if (!user) return null;

    //database user data
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const thread = await fetchThreadById(params.id);
    console.log("thread---> ",thread);
    

    return (
        <section className="relative" >
            <div>
                <ThreadCard
                    id={thread._id}
                    currentUserId={user.id}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            </div>
        </section>
    )
}

export default Page