# --abort-on-container-exit 	faz com que todos os containers parem se um der erro
#								inconpatível com -d
# --build 						builda antes de startar
.PHONY: up
up:
	if [ ! -f "./.env" ]; then echo ".env missing\nRun \`make env\` to create all .env files" && exit 1; fi

	docker-compose up -d --build


# --rmi (all | local) 	remove (all | local) imagens desse serviço
# -v 					remove os volumes criados pela tag `volumes`
.PHONY: down
down:
	docker-compose down
#

.PHONY: env
env:
	if [ -f "./make_dotenv.sh" ]; then bash ./make_dotenv.sh; fi

#
