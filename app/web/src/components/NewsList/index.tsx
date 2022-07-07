import { useEffect, useState } from "react"
import { NewsCard, NewsCardProps } from "../NewsCard"


export const NewsList = (): JSX.Element => {
	const [news, setNews] = useState<NewsCardProps[] | undefined>([])
	useEffect(() => {
		fetch('http://localhost:3333/news').then(response => {
			if (response.ok) {
				response.json().then(data => {
					setNews(data)
				})
			}
			throw response
		})
	}, [])
	if (news) return (
		<ul className="w-full h-full flex flex-col items-center">
			{news.map((news, index) => <NewsCard key={index} {...news} />)}
		</ul>
	)

	return <></>
}

