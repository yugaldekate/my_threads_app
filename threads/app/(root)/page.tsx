import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  
  const user = await currentUser();

  console.log(user?.imageUrl);
  
  return (
    <div>
      <>
        <h1 className="text-white">Homepage</h1>
      </>
    </div>
  )
}