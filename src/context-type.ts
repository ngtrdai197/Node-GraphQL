import { Request, Response } from "express";

export interface ContextType {
  req: Request & { user: any };
  res: Response;
}
