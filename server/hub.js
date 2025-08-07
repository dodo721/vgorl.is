const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	if ( ! req.user) {
		res.render('templates/error', {httpcode:401, error:"you ain't allowed here bubs >_<"});
	} else {
		res.render('templates/hub', {user: req.user});
	}
});

module.exports = router;
