

Setup database: 
	Check that you have installed HomeBrew:
		run ~$: which brew

	Install postgres:
		run ~$: brew install postgresql

	Configure postgres and create database:
		run ~$: psql postgres
		run ~$: CREATE ROLE root WITH LOGIN PASSWORD '';
		run ~$: ALTER ROLE root CREATEDB;
		run ~$: \q
		run ~$: psql postgres -U root
		run ~$: CREATE DATABASE yelpwrap;

------------------------

Initialize dependencies:

npm install

------------------------

Compile scrips:

npm run build

------------------------

Start dev server:

npm Start
