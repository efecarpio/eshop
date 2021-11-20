import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

/**
 * Entidad compartida para auditoria en las tablas
 * @export
 * @class Auditoria
 */
export class AuditShared {
  @CreateDateColumn({ type: "timestamp" })
  createdat!: Date;
  @UpdateDateColumn({ type: "timestamp" })
  updatedat!: Date;
  @Column({
    type: 'int',
    default: 1
  })
  isactive!: number;
}