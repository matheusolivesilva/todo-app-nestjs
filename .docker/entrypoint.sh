#!/bin/sh

cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
npm run build
npm run start:dev

