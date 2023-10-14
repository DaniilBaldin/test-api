import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Api {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @Column()
  exclude: string;

  @Column({
    type: 'jsonb',
  })
  response: any;

  @Column()
  dateCreated: string;

  constructor(request?: string, response?: any, dateCreated?: string) {}
}
