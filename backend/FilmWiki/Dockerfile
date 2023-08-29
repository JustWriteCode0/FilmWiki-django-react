FROM python:3.11.5-alpine3.18

COPY ./req.txt /temp/req.txt 
COPY . /FilmWiki
WORKDIR /FilmWiki
EXPOSE 8000

RUN apk add postgresql-client build-base postgresql-dev

RUN pip install -r /temp/req.txt

RUN adduser --disabled-password admin-user

USER admin-user