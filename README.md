# Entitlements

This is a yarn project, you can use the usual commands.

## Prerequisites

In order to run docker you need to run Linux

In order to run e9t or the database locally you need at least Docker 1.13 (or 17.03) and a ready to run swarm.
For this you need to:

* Add the `--experimental` option into the DOCKER_OPTS flags

* Initialize Docker swarm doing:

```
docker swarm init --advertise-addr 127.0.0.1
```

:warning: The `--advertise-addr 127.0.0.1` create a blind and deaf node that won't be able to be joined. Use it only when doing local tests on one node

## Usage

| Script                      | Description                 |
|-----------------------------|-----------------------------|
| `yarn run test-using-db`     | Test e9t using PostgreSQL |
| `yarn start`                 | Start e9t (use an in memory storage if DB_URL is not set) |
| `yarn run deploy-db`         | Deploy PostgreSQL |
| `yarn run start-using-db`    | Start e9t using PostgreSQL by setting the DB_URL variable |
| `yarn run deploy-e9t-env`    | Deploy both e9t and PostgreSQL docker images |
| `yarn run remove-stack`      | Remove the e9t stack, both e9t and PostgreSQL will be removed |
| `yarn run gitlab-ci-lint`    | Check the content of the `.gitlab-ci.yml` file |
| `yarn run check-updates`     | Check if the dependencies are up-to-date |
| `yarn run update-deps`       | Update the dependencies |

## Variables

| Variable                | Meaning   |  Default value |
|-------------------------|-----------|----------------|
| `E9T_PORT`              | port to bind for e9t service | 3000 |
| `E9T_DB_URL`            | Database connection URL with the following format: `postgres://<user>:<password>@<hostname>:<port>/<dbname>` | If not provided an in memory storage is used |
| `E9T_DB_SSL`            | Is SSL activated for the database? | false |
| `E9T_DB_INIT_TIMEOUT`   | Database initiation timeout | 60 |
| `E9T_KEYCLOAK_URL`      | Keycloak Url | http://keycloak |
| `E9T_KEYCLOAK_REALM`    | Keycloak Realm | master |
| `E9T_LOG_REQUEST`       | Where to output log requests. Values can be console or a path to a file. | console |
| `E9T_LOG_SERVER`        | Where to output server logs. Values can be console or a path to a file. | console |
| `E9T_LOG_SQL`           | Display in the console the SQL queries used by Sequelize | false |
| `E9T_PUB_SUB_URL`       | PubSub Url |  |
| `E9T_APPCPUBSUB_KEY`    | APIKey for Entitlement Publish Client | If not provided no notification will be send |
| `E9T_APPCPUBSUB_SECRET` | Secret to sign notification  | If not provided no notification will be send  |
| `E9T_APPCPUBSUB_URL `   | Appcelerator Publish/Subscribe url | If not provided no notification will be send |


As a convenience, these variables can be replaced by a YAML object inside one variable called E9T_CONFIG.

Here is an example of a valid YAML for E9T_CONFIG :
```
db:
  url: "postgres://user:pass@host.com:1234/db"
keycloak:
  url: "https://keycloak.url.here"
  realm: master
```
