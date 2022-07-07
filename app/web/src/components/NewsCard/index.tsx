export type NewsCardProps = {
	title: string
	description: string
}

export const NewsCard: React.FC<NewsCardProps> = ({ title, description }): JSX.Element => {
	return <>
		<li className="max-w-lg w-full overflow-clip p-4 h-32 bg-gray-800 border-black border">
			<div className="text-gray-300 text-xl">{title}</div>
			<div className="text-gray-500 ">{description}</div>
		</li>
	</>
}
