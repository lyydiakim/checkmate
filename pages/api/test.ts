import { NextApiRequest,NextApiResponse } from "next";

type ResponseData = {
    msg: String
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    res.status(200).json({msg: 'dis da test endpoint baby'})
}