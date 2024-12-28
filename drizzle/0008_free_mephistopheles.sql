CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"fee_id" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"staff_id" integer NOT NULL,
	"date" timestamp NOT NULL,
	"amount" double precision NOT NULL,
	"status" varchar NOT NULL,
	"method" varchar NOT NULL,
	"remarks" varchar,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_fee_id_fees_id_fk" FOREIGN KEY ("fee_id") REFERENCES "public"."fees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_parent_id_parents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_staff_id_staff_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE no action ON UPDATE no action;