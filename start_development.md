# 最初の第一歩(ソースコードがない、一番初めに行う)
1. dockerディレクトリに移動する
1. 以下のコマンドを実行する
    1. `mkdir react`
    1. `cp ./compose/create_app/compose.yml ./`
    1. `docker compose build`
    1. `docker compose run --rm react sh -c "cd /var && npx create-react-app react_app"`

# App作成後の開発
1. dockerディレクトリに移動する
1. 以下のコマンドを実行する
    1. `chmod +x development.sh`
    1. `cp ./compose/dev_react/compose.yml ./`
    1. `docker compose build`
    1. `docker compose up`