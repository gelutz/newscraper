log:
	docker-compose logs -f

clean:
	sudo rm -rf node_modules \
		app/api/node_modules \
		app/api/dist \
		app/api/.env \
		app/web/node_modules \
		app/web/.env \
		app/webscraper/node_modules \
		app/webscraper/.env

dev:
	make clean && yarn

env:
	for file in $$(ls --ignore=tmp ./app); do \
		sudo rm -rf "./app/$$file/.env" && \
        cp ".env" "./app/$$file/" && echo "Copying to $$file"; \
    done
