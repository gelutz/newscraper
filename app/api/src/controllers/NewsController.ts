import { Request, Response } from "express"
import { getRepository } from "typeorm"

import New from "../models/News"

class NewsController {
	async index(req: Request, res: Response) {
		const repository = getRepository(New)

		const { id, title, link } = req.body

		const returnedNews = await repository.findOne({ id, title, link })

		res.send({ ...returnedNews })
	}

	async store(req: Request, res: Response) {
		const repository = getRepository(New)

		const data = req.body
		try {
			const updated = await repository.save(data)
			console.log(updated)

			res.send({ ...updated })
		} catch (error) {
			console.error(error)
		}
	}
}

export default new NewsController()
