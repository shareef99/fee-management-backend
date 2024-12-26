CREATE TABLE "staff" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"role" varchar NOT NULL,
	"mobile" varchar(15) NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "staff_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "organization" RENAME TO "organizations";--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organization_email_unique";--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_email_unique" UNIQUE("email");