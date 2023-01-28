# PMS Inventory

## Syetem Requirement
- Laravel 8
- PHP 7.4

## Installation
1. Clone this repository.
```
git clone https://github.com/akdelarosa01/pms-inventory.git
```

2. Navigate to project folder.
```
cd pms-inventory
```

3. Install Dependencies via Composer.
```
composer install
```

4. Install JavScript Libraries.
```
npm install
```

5. Copy .env.example file as .env file.
```
cp .env.example .env
```

6. Create and setup MySQL database.
7. Setup MySQL Credentials in .env file.
8. Migrate and seed the database.
```
php artisan migrate:fresh --seed
```

9. Navigate to Frontend Files.
```
cd pms-react
```

10. Install JavaScript Dependencies.
```
npm install
```

11. Copy another .env.example file as .env file. This is to determine the API base URL.
```
cd .env.example .env
```

12. Run dev command.
```
npm run dev
```

13. Add new terminal tab then run php artisan command to run laravel server.
```
cd ../
php artisan serve
```
Or create a virtual host for Laravel to prevent executing php artisan serve everytime.
