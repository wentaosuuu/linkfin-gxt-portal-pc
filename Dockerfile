FROM harbor.caih.local/linkfin/egg-base:v1.0.0

EXPOSE 80
CMD ["yarn", "run", "docker"]

WORKDIR /app
ADD . .

RUN yarn config set registry http://nexus.caih.local/repository/npm-all/ \
    && yarn config set sass-binary-site https://npm.taobao.org/mirrors/node-sass \
    && yarn \
    && yarn run build \
    && yarn cache clean \
    && apk del .build-deps
