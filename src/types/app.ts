import { StaffRole } from "./enums.ts";

declare module "hono" {
  interface ContextVariableMap {
    staff_id: number;
    role: StaffRole;
    organization_id: number;
  }
}

export type TokenPayload = {
  id: number;
  organization_id: number;
  name: string;
  email: string;
  role: StaffRole;
  mobile: string;
};
