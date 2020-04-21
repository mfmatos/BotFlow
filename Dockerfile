FROM lappis/botflow-requirements as build-stage

WORKDIR /botflow
COPY ./app .

ENV REACT_APP_URL_API https://botflow.c3.complemento.net.br/

ARG configuration=production

RUN npm run build

FROM nginx:1.15
COPY  ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /botflow/build/ /usr/share/nginx/html
