import {NextApiRequest } from "next"
import { getSession } from "next-auth/react"

import prismadb from "@/lib/prismadb"