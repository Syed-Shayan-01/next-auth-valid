import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full h-20 flex justify-between items-center px-10 shadow-md bg-[#fefefe]">
      <h1 className="font-bold">NEXTJS AUTHENTICATION</h1>
      <div className="flex gap-4">
        {session && (
          <Link
            className="shadow-md py-2 px-6 border-[1px] border-black rounded-full font-semibold hover:bg-[#efefef]"
            href={"/profile"}
          >
            Profile
          </Link>
        )}

        {!session ? (
          <Link
            className="shadow-md py-2 px-6 border-[1px] border-black rounded-full font-semibold hover:bg-[#efefef]"
            href={"/auth/login"}
          >
            Log in
          </Link>
        ) : (
          <div
            onClick={() => signOut()}
            className="shadow-md py-2 px-6  rounded-full bg-black text-white cursor-pointer font-semibold hover:opacity-70"
          >
            Log out
          </div>
        )}
      </div>
    </div>
  );
};
