rm -rf ./server/public
cd client; 
rm -rf build && 
yarn &&
yarn build && 
cd .. &&
mkdir -p ./server/public &&
cp -r ./client/build ./server/public/ &&
mv ./server/public/build ./server/public/ &&
# cd admin
# rm -rf build && 
# yarn &&
# yarn build &&
# cd .. &&
# cp -r ./admin/build ./server/public/ &&
# mv ./server/public/build ./server/public/admin
