import { AuthChecker } from "type-graphql";
import { ContextType } from "./context-type";

export const authChecker: AuthChecker<ContextType> = (
  { root, args, context, info },
  roles
): boolean => {
  // fetch user => assign user detail profile instead infor from decode
  if (!context.req.user) return false;
  return true; // or false if access is denied
};
