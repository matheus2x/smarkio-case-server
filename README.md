<h1 align="center">
    <img alt="Logo" title="#logo" width="200px" src=".github/smarkio-logo.png"><br>
</h1>
<hr>

# Summary

- [What is this?](#what-is-this)
- [Techs used](#techs-used)
- [Getting started](#getting-started)
- [API Usage](#api)
- [Useful URLs](#useful-urls)

<a id="what-is-this"></a>

## :thinking: What is this?

This is the Server Side of my interview application in **Smarkio**.<br>
Basically, a REST API that consists of converting text to speech using the **IBM Watson Cloud** platform.

**Client-Side** available: [Here](https://github.com/matheus2x/smarkio-case-client/ "Client-Side")

<a id="techs-used"></a>

## :rocket: Techs used

- **Node.js** - A JavaScript Interpreter
- **TypeScript** - A Superset for JavaScript
- **MySQL** - A Relational Database
- **Knex.js** - A SQL Query Builder
- **Docker** - A Container Creator
- **Docker Compose** - A Container Orchestrator

<a id="getting-started"></a>

## :fire: Getting started

- ### You may **need** to install:

  - A Distributed **Version-Control-System** -> [Git](https://git-scm.com/ "Git")
  - A JavaScript **Interpreter** -> [Node.js](https://nodejs.org/ "Node.js")
  - Some **Package Manager** Like -> [NPM](https://www.npmjs.com/) **or** [Yarn](https://yarnpkg.com/)
  - The Relational **Database** -> [MySQL](https://www.mysql.com/ "MySQL")
  - Container **Docker** -> [Docker](https://docs.docker.com/get-docker/ "Docker")
  - Container Orchestrator **Docker Compose** -> [Docker Compose](https://docs.docker.com/compose/install/ "Docker Compose")

- ### Others requirements:

  - A **IBM Watson Cloud** Account -> [IBM-Register](https://cloud.ibm.com/ "IBM-Register")
  - On your **IBM account**, you will need to use the **Text To Speech (TTS)** service.

1. Clone this repo with:

```sh
  $ git clone https://github.com/matheus2x/smarkio-case-server.git
```

2. Move yourself to the appropriate directory: `$ cd smarkio-case-server`
3. Rename `.env.example` to `.env`

#### Now, we have 2 paths: **With** Docker and **Without** Docker:

- ### **With** Docker:

1. In your `.env` file, add credentials for your [IBM-Cloud](https://cloud.ibm.com/ "IBM-Cloud") Account:

   ```js
   	TTS_API_KEY=
   	TTS_URL=
   ```

2. Run `$ docker-compose up --build -d` to build docker-compose
3. Run `$ npm run populate` to run migrations

- ### **Without** Docker:

1. To installing dependencies, run: `$ npm install`
2. In your `.env` file, change values with your credentials:

```js
	// Server
	NODE_PORT=3333  // OPTIONAL

	// MySQL
	MYSQL_HOST=smarkio-case-mysql // without docker= REQUIRED
	MYSQL_USER= // OPTIONAL
	MYSQL_PASS= // OPTIONAL
	MYSQL_DB= // without docker= REQUIRED

	// IBM Cloud
	TTS_API_KEY= // REQUIRED
	TTS_URL= // REQUIRED
```

3. In your MYSQL, create a DB (with the same name as in your `.env` file):

```SQL
CREATE DATABASE someDatabase;
```

3. Run `$ npm run build` to compile ts build bundle
4. Run `$ npm run knex:migrate` to run migrations
5. Run `$ npm run start` to start server

### If you've done Everything so far, you can now Start the [Client-Side](https://github.com/matheus2x/smarkio-case-client).

<br>

<a id="api"></a>

## :orange_book: API Usage

Attention: Omit the braces <code>{}</code> from examples. They indicate variable values

### Routes

#### 1. Create a new speechable comment:

Method: `POST` <br>
Route: `http://localhost:{NODE_PORT}/tts` <br>
Request Body:

```javascript
	{
		"comment": String,
		"voiceLang": String // "1" to pt-br and "2" to en-us
	}
```

Response:

```javascript
	{
		"id": Number,
		"comment": String,
		"audio": String // path to use
	}
```

#### 2. Listen to the comment speech:

Method: `GET` <br>
Route: `http://localhost:{NODE_PORT}/uploads/speech-{commentID}.mp3` <br>
Output: `audio.mp3 bynary file` <br>
Example: [speech-1.mp3](https://github.com/matheus2x/smarkio-case-server/blob/master/uploads/speech-1.mp3) <br>
Listen audio in Vocaroo: https://voca.ro/1kSLOdtoUecV

#### 3. Index all comments in DB:

Method: `GET` <br>
Route: `http://localhost:{NODE_PORT}/tts` <br>

Response:

```javascript
	[
		{
			"id": Number,
			"comment": String,
			"audio": String
		},
		{
			"id": Number,
			"comment": String,
			"audio": String
			},
		...
  ]
```

<a id="useful-urls"></a>

## :link: Useful URLs

- [Client Side](https://github.com/matheus2x/smarkio-case-client/ "Client Side")

---

- [Git](https://git-scm.com/ "Git")
- [Node](https://nodejs.org/ "Node")
- [MySQL](https://www.mysql.com/ "MySQL")
- [Docker](https://www.docker.com/ "Docker")
- [IBM-Watson-Cloud](https://cloud.ibm.com/ "IBM-Watson-Cloud")

---

<h4 align="center">
    Made with :fox_face: by <a href="https://www.linkedin.com/in/matheus2x/" target="_blank">Matheus Henrique</a>
</h4>
