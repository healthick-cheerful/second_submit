#!/bin/bash

command chmod +x build_react.sh

command cp ./compose/build_react/compose.yml ./

command docker compose build && docker compose up && docker compose down --rmi all --remove-orphans

command cp ./compose/run_app/compose.yml ./

command docker compose build && docker compose up