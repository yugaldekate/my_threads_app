import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";


const Page = async ({ params }: { params: { id: string } }) => {

    if (!params.id) return null;
    
    //clerk user
    const user = await currentUser();
    if (!user) return null;

    //database user data
    const userInfo = await fetchUser(user.id);
    console.log("user info -----> ",userInfo);
    
    if (!userInfo?.onboarded) redirect("/onboarding");

    const thread = await fetchThreadById(params.id);
    console.log("thread by id---> ",thread);
    

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

            <div className='mt-7'>
                <Comment
                    threadId={params.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className='mt-10'>
                {thread?.children?.map((childItem: any) => (
                    <ThreadCard
                        key={childItem._id}
                        id={childItem._id}
                        currentUserId={user.id}
                        parentId={childItem.parentId}
                        content={childItem.text}
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        isComment
                    />
                ))}
      </div>
        </section>
    )
}

export default Page