import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class ItemShopItem extends BaseEntity {
  @PrimaryColumn()
  itemId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  rarity!: string;

  @Column()
  price!: number;

  @Column()
  imageUrl!: string;
}
