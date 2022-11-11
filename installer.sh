#!/bin/bash

command sudo yum install -y docker
command sudo systemctl start docker
command sudo systemctl enable docker
command sudo usermod -a -G docker ec2-user

command sudo mkdir -p /usr/local/lib/docker/cli-plugins/
command sudo curl -SL https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
command sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose