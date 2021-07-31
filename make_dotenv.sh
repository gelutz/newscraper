folders=($(ls ./app))

# shouldnt copy to ./app/client
for f in ${folders[@]:1}
do
    cp "$(pwd)/.env" "./app/$f/"
    echo "Copying to $f"
done
