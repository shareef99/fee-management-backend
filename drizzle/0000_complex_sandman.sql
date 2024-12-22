CREATE TABLE IF NOT EXISTS "organization" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"address" varchar(255) NOT NULL,
	"mobile" varchar(15) NOT NULL,
	"random" varchar(255),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organization_email_unique" UNIQUE("email")
);
