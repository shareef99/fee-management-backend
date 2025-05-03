ALTER TABLE "payments" DROP CONSTRAINT "payments_parent_id_parents_id_fk";
--> statement-breakpoint
ALTER TABLE "staff" ALTER COLUMN "organization_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "parent_id";