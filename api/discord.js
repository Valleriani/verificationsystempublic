const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { URLSearchParams } = require('url');
const { catchAsync } = require('../utils');

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = 'http://91.229.245.18:50451/api/discord/callback';

router.get('/login', (req, res) => {
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback',	catchAsync(async (req, res) => {
		if (!req.query.code) throw new Error('NoCodeProvided');
		const code = req.query.code;
		const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
		const data = {
			grant_type: 'authorization_code',
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			code,
			redirect_uri: redirect,
			scope: 'identify',
		};
		const response = await fetch(
			`https://discord.com/api/oauth2/token`,
			{
				method: 'POST',
				headers: {
					Authorization: `Basic ${creds}`,
					'Content-type': `application/x-www-form-urlencoded`,
				},
				body: new URLSearchParams(data),
			},
		);
		const json = await response.json();
		console.log(json);
		res.redirect(`/?token=${json.access_token}`);
	}),
);

module.exports = router;
