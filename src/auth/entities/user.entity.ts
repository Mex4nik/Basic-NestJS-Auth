import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class AccessToken {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public token: string;
}

export default AccessToken;
