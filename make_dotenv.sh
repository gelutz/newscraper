symlink_dotenv() {
    if [ ! -L "$1/.env" ]; then
        echo "Creating symbolic link $1/.env"
        ln -s "$(pwd)/.env" "$1/.env"
    fi
}

text="# SERVER
SERVER_PORT=3333
DEBUG_PORT=9229
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=newscraper
# CLIENT
CLIENT_PORT=3000
JWT_SECRET=eu123so456foda789
# SERVICE
# DOCKER
TARGET=development

"

folders=($(tree -fri --noreport -L 1  ./app/))

if [ ! -f "./.env" ]; then
    echo "${text}" > "./.env"
fi

for f in ${folders[@]:1}
do
    symlink_dotenv "$f"
done
