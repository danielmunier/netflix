import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  if (!session?.user?.email) {

    console.log("No session")
    throw new Error("Not Signed in");
  }
  
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });


  if (!currentUser) {
    console.log("I didn't found the user in database")
    throw new Error("Not signed in");
  }

  return { currentUser };
};


export default serverAuth