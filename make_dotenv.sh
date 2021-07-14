folders=($(tree -fri --noreport -L 1  ./app/))

for f in ${folders[@]:1}
do
    echo "Creating symbolic link $f"
    cp "$(pwd)/.env" "$f/"
done
