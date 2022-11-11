# インストール手順
1. http/httpsのポートを開放しておく
1. サーバーでキーペアを作成
    - `ssh-keygen -b 4096`
1. サーバーの公開鍵をローカル環境にコピーする(ローカルで実行)
    - `scp -i {keypath} ec2-user@{ip}:/home/ec2-user/.ssh/id_rsa.pub ./`
1. 公開鍵をgithubに登録する
1. サーバーにgitをインストールする
    - `sudo yum install -y git`
1. このgithubリポジトリをクローンする
    - `git clone git@github.com:healthick-cheerful/second_submit.git`
1. クローンしたリポジトリ内部のインストーラー等に実行権限を付与する
    - `chmod +x ./second_submit/installer.sh`
1. インストーラーを実行し、シェルを再起動する
    - `./second_submit/installer.sh`

# reactのビルド(ローカルで実行)
1. dockerディレクトリに移動する
1. 以下のコマンドを実行する
    1. `chmod +x build_react.sh`
    1. `cp ./compose/build_react/compose.yml ./`
    1. `docker compose build`
    1. `docker compose up`

# scpコマンドを利用してビルド結果をサーバーに送信(ローカルで実行)
1. 以下のコマンドを実行する
    - `scp -i {keypath} -r ./react/build ec2-user@{ip}:/home/ec2-user/second_submit/docker/react/`

# アプリの実行
1. dockerディレクトリに移動する
1. 以下のコマンドを実行する
    1. `cp ./compose/run_app/compose.yml ./`
    1. `docker compose build`
    1. `docker compose up`

# MySQLの設定
1. 以下のコマンドを入力し、MySQLコンテナ内に入る
- `docker compose exec mysql mysql techc`
1. 以下のSQLを実行する