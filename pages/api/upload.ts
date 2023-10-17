//aws code to upload image to s3 bucket
import { NextApiRequest, NextApiResponse } from "next";

const AWS = require("aws-sdk");

const region = "us-west-1";

const bucketName = "checkmate-fairfare";

