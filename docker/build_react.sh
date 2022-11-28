#!/bin/bash

command cd /var/react_app

if [ -d node_modules ]; then
    command npm install
fi

command npm run build