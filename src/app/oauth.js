import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"http://localhost:8080/api/auth/google/callback"
);

const scopes = [
	"https://www.googleapis.com/auth/userinfo.email",
	"https://www.googleapis.com/auth/userinfo.profile",
];

export const authorizationURL = oauth2Client.generateAuthUrl({
	access_type: "offline",
	scope: scopes,
	include_granted_scopes: true,
});
