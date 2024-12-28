CREATE TABLE "fees" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"grade_id" integer NOT NULL,
	"academic_year_id" integer NOT NULL,
	"fee_amount" double precision NOT NULL,
	"discount" double precision DEFAULT 0 NOT NULL,
	"due_amount" double precision NOT NULL,
	"paid" double precision DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "fees" ADD CONSTRAINT "fees_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fees" ADD CONSTRAINT "fees_parent_id_parents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fees" ADD CONSTRAINT "fees_grade_id_grades_id_fk" FOREIGN KEY ("grade_id") REFERENCES "public"."grades"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fees" ADD CONSTRAINT "fees_academic_year_id_academic_year_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_year"("id") ON DELETE no action ON UPDATE no action;