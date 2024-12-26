CREATE TABLE "academic_year" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "grades" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "grades" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;