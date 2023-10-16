import { z } from "zod";
import { leaguesSchema } from "@/models/Schemas";

export type Leagues = z.infer<typeof leaguesSchema>;
