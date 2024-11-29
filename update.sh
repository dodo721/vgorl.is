echo "UPDATING!"
cd /home/oem/www/
echo "Git pull..."
git pull
echo "Lessc..."
lessc ./src/style/main.less ./public/style/main.css
echo "Nginx reload..."
nginx -s reload
echo "FINISHED!"
