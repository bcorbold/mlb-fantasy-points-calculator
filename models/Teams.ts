import { z } from "zod";
import { teamsSchema } from "@/models/Schemas";

export type Teams = z.infer<typeof teamsSchema>;
