const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const Database = require('./db');
const db = new Database();

// Create tables if not already done so

const create_tables = async () => {
	try {
		await db.exec(`
			CREATE TABLE IF NOT EXISTS users (
				id INTEGER PRIMARY KEY,
				email TEXT UNIQUE NOT NULL,
				json_data TEXT NOT NULL DEFAULT '{}',
				password_hash BLOB NOT NULL,
				salt BLOB NOT NULL,
				CHECK (
					email LIKE '%_@_%._%' AND
					LENGTH(email) - LENGTH(REPLACE(email, '@', '')) = 1 AND
					SUBSTR(LOWER(email), 1, INSTR(email, '.') - 1) NOT GLOB '*[^@0-9a-z]*' AND
					SUBSTR(LOWER(email), INSTR(email, '.') + 1) NOT GLOB '*[^a-z]*'
				)
			)
		`);
	} catch (e) {
		console.error("FAILED to create SQLITE tables: ", e);
	}
};

create_tables();

// Adapted from https://www.passportjs.org/tutorials/password/verify/
passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"}, async function (email, password, callback) {
	try {
		// Get users from database
		const row = await db.get_first('SELECT * FROM users WHERE email = ?', [email]);
		// If nothing returned, wrong email
		if ( ! row) {
			return callback(null, false, {message: "Incorrect email or password."});
		}
		// Hash given password
		crypto.scrypt(password, row.salt, 32, (err, password_hash) => {
			// Return error if given
			if (err) {
				return callback(err);
			}
			// Timing safe equals prevents attackers using comparison time to guess passwords
			if ( ! crypto.timingSafeEqual(row.password_hash, password_hash)) {
				// If not equal, wrong password
				return callback(null, false, {message: "Incorrect email or password."});
			}
			// Success!
			return callback(null, row);
		});
	} catch (e) {
		// Log any errors
		console.error(e);
		return callback(e);
	}

}));


passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});



const router = express.Router();

router.post('/', passport.authenticate('local', {
	successReturnToOrRedirect: '/hub',
	failureRedirect: '/login',
	failureMessage: true
}));

module.exports = router;
