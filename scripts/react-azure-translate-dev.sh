#!/bin/bash
# Start development server

cd $(dirname $0)

HTTPS=true PORT=3200 npm start