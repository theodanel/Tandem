# Tandem

## Initialisation backend (Laravel) :

Lancer le serveur de la BDD (WAMP ou autre)

Créer fichier .env à partir du .env.example

Dans le terminal :
`composer update`

`composer install`

`php artisan key:generate`

`php artisan migrate` -> yes (création de la BDD)

`php artisan migrate:fresh --seed`

`php artisan serve`

## Initialisation frontend (React) :
`npm install`

`npm start`