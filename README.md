# インストール手順

1. http/httpsのポートを開放しておく
1. サーバーでキーペアを作成
    - `ssh-keygen -b 4096`
1. サーバーの公開鍵をローカル環境にコピーする
    - `scp -i {keyname} {username}@{ip}:/home/ec2-user/.ssh/id_rsa.pub ./`
1. 公開鍵をgithubに登録する
1. サーバーにgitをインストールする
    - `sudo yum install -y git`
1. このgithubリポジトリをクローンする
    - `git clone git@github.com:healthick-cheerful/second_submit.git`
1. クローンしたリポジトリ内部のインストーラー等に実行権限を付与する
    - `chmod +x ./second_submit/installer.sh`
    - `chmod +x ./second_submit/run_app.sh`
1. インストーラーを実行し、シェルを再起動する
    - `./second_submit/installer.sh`
1. dockerディレクトリまで移動し、以下のコマンドを入力する
    - `cd ./second_submit/docker`
    - `./run_app.sh`

# MySQLの設定
1. 以下のコマンドを入力し、MySQLコンテナ内に入る
- `docker compose exec mysql mysql techc`
1. 以下のSQLを実行する