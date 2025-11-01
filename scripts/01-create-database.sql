-- init-db.sql
SELECT 'CREATE DATABASE retirement_plan_stay_database' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'retirement_plan_stay_database')\gexec
-- You can add other schema or table creation commands here
