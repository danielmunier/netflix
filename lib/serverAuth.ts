import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import {nextAuthOptions}  from "@/pages/api/auth/[...nextauth]";


const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const session = await getServerSession( req, res, nextAuthOptions );
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