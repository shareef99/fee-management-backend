ALTER TABLE "fees" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "fees" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;