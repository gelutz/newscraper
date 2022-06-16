import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news')
class News {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    title: string;

    @Column('text', { nullable: false })
    link: string;

    @Column('varchar', { length: 20, nullable: true })
    origin: string;

    @Column('date', { nullable: true, default: 'current_date' })
    date: Date;
}

export default News;
