import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  
  const user = await currentUser();

  const result = await fetchPosts(1 , 10);

  console.log(" thread data ---->", result);
  
  
  return (
    <div>
      <>
        <h1 className="text-white">Homepage</h1>
      </>
    </div>
  )
}