export const Header = (): JSX.Element => {
	return <>
		<span className="w-full h-8 flex justify-between items-stretch border-b-2 border-gray-300">
			<div className="logo ml-2">
				<a href="/">Newscraper</a>
			</div>
			<div className="icon mr-2">
				<a href="/404">Well shoot</a>
			</div>
		</span>
	</>
}
