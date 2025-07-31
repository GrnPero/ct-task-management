### How to set-up and deploy

## Database
1. First, we create the database in MySQL called `tasks`.

2. Run the command line `mysql -u <user_name> -p`

3. Once the MySQL shell opens we run the command `create database tasks`.

4. Next, if using a unix based OS run this command `cp .env.example .env`

5. Then enter the credentials for your database:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task
DB_USERNAME=root
DB_PASSWORD=
```

## Packages and npm Modules
1. First, we run `composer install` in the root directory of our Laravel

2. Next, we run `npm i` to download our npm modules

3. Than we run `php artisan key:generate`.

4. Next we do a migration `php artisan migrate`

## Running the Application
1. We run the command `npm run dev` to run the front-end.

2. Then we run `php artisan serve` follow the address listed in the command line.

Now you can run my application!