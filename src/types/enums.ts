// Staff
export const staffRoles = ["admin", "operator", "accountant"] as const;
export type StaffRole = (typeof staffRoles)[number];
