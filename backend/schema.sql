-- ====================================================
-- DATABASE SCHEMA EXPORT (Neon PostgreSQL)
-- Exported at: 2026-10-29T06:55:24.959Z
-- ====================================================

-- 1. CREATE DATABASE
CREATE DATABASE neondb;

\connect neondb;

-- 4. SEQUENCES
CREATE SEQUENCE IF NOT EXISTS admin_users_id_seq;
CREATE SEQUENCE IF NOT EXISTS uploads_id_seq;
CREATE SEQUENCE IF NOT EXISTS roles_id_seq;
CREATE SEQUENCE IF NOT EXISTS permissions_id_seq;

-- 5. TABLES

CREATE TABLE "admin_users" (
    "id" INTEGER NOT NULL DEFAULT nextval('admin_users_id_seq'::regclass),
    "username" TEXT NOT NULL,
    "password_hash" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "role_id" INTEGER,
    "display_name" TEXT,
    "setup_token" TEXT,
    "setup_token_expires" TIMESTAMP WITH TIME ZONE,
    "email" TEXT,
    "last_reset_requested_at" TIMESTAMP WITH TIME ZONE,
    "temp_password_hash" TEXT,
    "temp_password_expires" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

CREATE TABLE "content_store" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_by" TEXT,
    PRIMARY KEY ("key")
);

CREATE TABLE "permissions" (
    "id" INTEGER NOT NULL DEFAULT nextval('permissions_id_seq'::regclass),
    "resource" TEXT NOT NULL,
    "resource_label" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "role_permissions" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    PRIMARY KEY ("role_id", "permission_id")
);

CREATE TABLE "roles" (
    "id" INTEGER NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    PRIMARY KEY ("id")
);

CREATE TABLE "uploads" (
    "id" INTEGER NOT NULL DEFAULT nextval('uploads_id_seq'::regclass),
    "folder" CHARACTER VARYING(60) NOT NULL,
    "original_name" TEXT NOT NULL,
    "stored_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mime_type" CHARACTER VARYING(150),
    "size_bytes" INTEGER,
    "uploaded_by" CHARACTER VARYING(100),
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "data" BYTEA,
    PRIMARY KEY ("id")
);

-- 6. FOREIGN KEYS
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE;
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id") ON UPDATE NO ACTION ON DELETE CASCADE;
ALTER TABLE "admin_users" ADD CONSTRAINT "admin_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- 7. INDEXES
CREATE UNIQUE INDEX admin_users_username_key ON public.admin_users USING btree (username);
CREATE INDEX idx_uploads_folder ON public.uploads USING btree (folder);
CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);
CREATE UNIQUE INDEX permissions_resource_action_key ON public.permissions USING btree (resource, action);

