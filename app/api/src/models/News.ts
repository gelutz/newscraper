import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm"

@Entity("news")
class News {
	@PrimaryGeneratedColumn("increment")
	id: string

	@Column()
	title: string

	@Column()
	link: string

	@Column()
	from: string

	@Column()
	date: Date
}

export default News
