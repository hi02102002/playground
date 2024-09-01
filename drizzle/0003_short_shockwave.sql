ALTER TABLE "password_reset_tokens" ADD COLUMN "token_hash" text NOT NULL;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" DROP COLUMN IF EXISTS "code";--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_token_hash_unique" UNIQUE("token_hash");