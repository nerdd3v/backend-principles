import express from "express"
import { createClient } from "redis"

const app = express();

const client = createClient();

