# 最初の第一歩(ソースコードがない、一番初めに行う)
1. dockerディレクトリに移動する
1. 以下のコマンドを実行する
    1. `mkdir react`
    1. `cp ./compose/create_app/compose.yml ./`
    1. `docker compose build`
    1. `docker compose run --rm react sh -c "cd /var && npx create-react-app react_app && cd /var/react_app && npm install axios"`

# reactの開発環境の実行
1. dockerディレクトリに移動する
1. 以下のコマンドを実行する
    1. `chmod +x dev_react.sh`
    1. `cp ./compose/dev_react/compose.yml ./`
    1. `docker compose build`
    1. `docker compose up`

# reactのビルド
1. dockerディレクトリに移動する
1. 以下のコマンドを実行する
    1. `chmod +x build_react.sh`
    1. `cp ./compose/build_react/compose.yml ./`
    1. `docker compose build`
    1. `docker compose up --remove-orphans`

# アプリケーションの実行
1. dockerディレクトリに移動する
1. 以下のコマンドを実行する
    1. `cp ./compose/run_app/compose.yml ./`
    1. `docker compose build`
    1. `docker compose up`

# データベースの登録
1. アプリケーションの実行後、以下のコマンドを入力する
    1. `docker compose exec mysql mysql techc`
1. 以下のsql文を発行する
    1. `CREATE TABLE users(id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, icon_filename TEXT DEFAULT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`
    1. `CREATE TABLE user_relationship(id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, followed_user_id INT UNSIGNED NOT NULL, follower_user_id INT UNSIGNED NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`