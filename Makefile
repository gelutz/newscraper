include .env
#
.PHONY: up

# --abort-on-container-exit 	faz com que todos os containers parem se um der erro
#								inconpatível com -d
# --build 						builda antes de startar	
up:
	docker-compose up -d --build

.PHONY: down

# --rmi (all | local) 	remove (all | local) imagens desse serviço
# -v 					remove os volumes criados pela tag `volumes`
down:
	docker-compose down
#