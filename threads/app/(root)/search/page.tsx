import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser , fetchUsers } from "@/lib/actions/user.actions";

import UserCard from "@/components/cards/UserCard";

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    //clerk user info
    const user = await currentUser();
    if (!user) return null;

    //user info from database 
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await fetchUsers({
        userId: user.id,
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 25,
    });

    return (
        <section>
            <h1 className='head-text mb-10'>Search</h1>

            <div className='mt-14 flex flex-col gap-9'>
                {result.users.length === 0 ? (
                    <p className='no-result'>No Result</p>
                ) : (
                    <>
                        {result.users.map((person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType='User'
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default Page