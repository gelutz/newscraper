import { Header } from "./components/Header"
import { NewsList } from "./components/NewsList"

export const App: React.FC = (): JSX.Element => {
	return (
		<main className="max-h-screen h-screen max-w-screen w-screen">
			<Header />
			<div className="flex flex-col items-center h-full w-full">
				<h1 className="w-full my-4 text-center text-3xl font-bold text-gray-600">
					Welcome to Newscraper
				</h1>
				<NewsList />
			</div>
		</main>

	)
}
