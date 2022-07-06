import { NewsCard } from "../NewsCard"

export const NewsList = (): JSX.Element => {
	return (
		<ul className="w-full h-full flex flex-col items-center">
			<NewsCard title="Title 1" description="Description 1" />
			<NewsCard title="Title 2" description="Description 2" />
		</ul>
	)
}


