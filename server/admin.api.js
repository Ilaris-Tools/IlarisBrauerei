const HomebrewModel = require('./homebrew.model.js').model;
const router = require('express').Router();
const Moment = require('moment');
//const render = require('vitreum/steps/render');
const templateFn = require('../client/template.js');
const zlib = require('zlib');

process.env.ADMIN_USER = process.env.ADMIN_USER || 'admin';
process.env.ADMIN_PASS = process.env.ADMIN_PASS || 'password3';

const mw = {
	adminOnly : (req, res, next)=>{
		if(!req.get('authorization')){
			return res
				.set('WWW-Authenticate', 'Basic realm="Authorization Required"')
				.status(401)
				.send('Authorization Required');
		}
		const [username, password] = Buffer.from(req.get('authorization').split(' ').pop(), 'base64')
			.toString('ascii')
			.split(':');
		if(process.env.ADMIN_USER === username && process.env.ADMIN_PASS === password){
			return next();
		}
		return res.status(401).send('Access denied');
	}
};


/* Search for brews that are older than 3 days and that are shorter than a tweet */
const junkBrewQuery = HomebrewModel.find({
	'$where'  : 'this.text.length < 140',
	createdAt : {
		$lt : Moment().subtract(30, 'days').toDate()
	}
}).limit(100).maxTime(60000);

/* Search for brews that aren't compressed (missing the compressed text field) */
const uncompressedBrewQuery = HomebrewModel.find({
	'text' : { '$exists': true }
}).lean().limit(10000).select('_id');

router.get('/admin/cleanup', mw.adminOnly, async (req, res)=>{
	junkBrewQuery.exec().then((objs)=>{
		return res.json({ count: objs.length });
	}).catch((err)=>{
		return res.status(500).send(err);
	});
});

/* Removes all empty brews that are older than 3 days and that are shorter than a tweet */
router.post('/admin/cleanup', mw.adminOnly, async (req, res)=>{
	junkBrewQuery.remove().exec().than((objs)=>{
		return res.json({ count: objs.length });
	}).catch((err)=>{
		return res.status(500).send(err);
	});
});

/* Searches for matching edit or share id, also attempts to partial match */
router.get('/admin/lookup/:id', mw.adminOnly, async (req, res, next)=>{
	HomebrewModel.findOne({ $or : [
		{ editId: { '$regex': req.params.id, '$options': 'i' } },
		{ shareId: { '$regex': req.params.id, '$options': 'i' } },
	] }).exec().then((brew, err)=>{
		return res.json(brew);
	}).catch((err)=>{
		return res.send(err);
	});
});

/* Find 50 brews that aren't compressed yet */
router.get('/admin/finduncompressed', mw.adminOnly, async (req, res)=>{
	uncompressedBrewQuery.exec().then((objs)=>{
		objs = objs.map((obj)=>{return obj._id;});
		return res.json({ count: objs.length, ids: objs });
	}).catch((err)=>{
		return res.status(500).send(err);
	});
});

/* Compresses the "text" field of a brew to binary */
router.put('/admin/compress/:id', (req, res)=>{
	HomebrewModel.get({ _id: req.params.id })
		.then((brew)=>{
			brew.textBin = zlib.deflateRawSync(brew.text);	// Compress brew text to binary before saving
			brew.text = undefined;							// Delete the non-binary text field since it's not needed anymore

			brew.save((err, obj)=>{
				if(err) throw err;
				return res.status(200).send(obj);
			});
		})
		.catch((err)=>{
			console.log(err);
			return res.status(500).send('Error while saving');
		});
});

router.get('/admin/stats', mw.adminOnly, async (req, res)=>{
	HomebrewModel.count().then((count)=>{
		return res.json({
			totalBrews : count
		});
	}).catch((err) => {
		return res.send(err);
	});
});

router.get('/admin', mw.adminOnly, (req, res)=>{
	templateFn('admin', {
		url : req.originalUrl
	})
		.then((page)=>res.send(page))
		.catch((err)=>res.sendStatus(500));
});

module.exports = router;
