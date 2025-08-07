const crypto = require('crypto');
const Database = require('../db');
const db = new Database("../vgorl.is.db");
const readline = require('readline');

const go = async () => {
	if (process.argv.length > 5 || process.argv.length <= 3) {
		console.error("Arguments: email, password, salt (optional)");
		return;
	}
	const email = process.argv[2];
	const password = process.argv[3];

	// Check user doesnt already exist
	try {
		const user = await db.get_first("SELECT * FROM users WHERE email=?", email);
		if (user) {
			console.log("User with email "+email+" already exists!");
			user.password_hash = user.password_hash.toString('hex');
			user.salt = user.salt.toString('hex');
			console.log(user);
			process.exit(1);
		}
	} catch (e) {
		console.log("Failed to check existing user: ", e);
	}

	// Generate salt
	let salt = process.argv[4];
	if ( ! salt) {
		salt = crypto.randomBytes(20);
		console.log("Generated salt: ", salt.toString('hex'));
	}

	// Generate hash
	crypto.scrypt(password, salt, 32, (err, hash) => {
		if (err) {
			console.error("Could not generate hash: ", err);
			process.exit(1);
		}
		console.log("Hashed password: ", hash.toString('hex'));
		const rl = readline.createInterface({input: process.stdin, output: process.stdout});
		rl.question("Enter into database? (Enter 'y' to continue): ", async (answer) => {
			// Confirm
			if (answer.toLowerCase() !== "y") {
				console.log("Exiting");
				process.exit(0);
			}
			try {
				// Insert into db!
				await db.exec("INSERT INTO users (email, password_hash, salt) VALUES (?, ?, ?)", [email, hash, salt]);
				console.log("User created!");
				process.exit(0);
			} catch (e) {
				console.error("Could not enter into database: ", e);
				process.exit(1);
			}
		});
	});
};

go();
