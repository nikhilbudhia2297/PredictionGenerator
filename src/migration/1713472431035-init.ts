import {MigrationInterface, QueryRunner} from "typeorm";

export class init1713472431035 implements MigrationInterface {
    name = 'init1713472431035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_photo_predictions" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "id" BIGSERIAL NOT NULL, "user_id" integer NOT NULL, "training_id" integer NOT NULL, "prediction_status" integer NOT NULL, "prediction_id" character varying NOT NULL, "metadata" jsonb NOT NULL, "prediction_image_url" character varying NOT NULL, CONSTRAINT "PK_31b9bc34b9f9ae187ab43e5b293" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7b43ac082c891434404fc62cb6" ON "user_photo_predictions" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_471f5dd7084b2821dd8c419e7a" ON "user_photo_predictions" ("training_id") `);
        await queryRunner.query(`CREATE TABLE "user_photo_uploads" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "id" BIGSERIAL NOT NULL, "user_id" integer NOT NULL, "metadata" jsonb NOT NULL, CONSTRAINT "PK_a46cb4868ac46890a40d06d5c50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_photo_trainings" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "id" BIGSERIAL NOT NULL, "user_id" integer NOT NULL, "upload_id" integer NOT NULL, "training_status" integer NOT NULL, "training_id" character varying NOT NULL, "metadata" jsonb NOT NULL, CONSTRAINT "PK_99e791d44baed48477990b818b3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_photo_trainings"`);
        await queryRunner.query(`DROP TABLE "user_photo_uploads"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_471f5dd7084b2821dd8c419e7a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b43ac082c891434404fc62cb6"`);
        await queryRunner.query(`DROP TABLE "user_photo_predictions"`);
    }

}
