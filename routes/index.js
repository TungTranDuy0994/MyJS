var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

const img_src = path.join(__dirname, '..', 'public', 'images', 'salt-shaker.jpeg');
const file_path = path.join(__dirname, '..', 'public', 'files', 'tung.txt');

function readfile_txt(file_path){
	return new Promise((resolve, reject)=>{
		fs.readFile(file_path, 'utf8',(err, data)=>{
			if (err){
				reject(err)
			}
			resolve(data)
		})
	});
}

const salt_image = new Promise ((resolve, reject) => {
	fs.readFile(img_src, 'utf8',(err, data)=>{
		if (err){
			console.log(err);
		}
		resolve(data)
	})
});


router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.get('/image', function(req, res, next) {
	salt_image.then(value =>{
		res.render('index', {title:'Images', src: 'images/salt-shaker.jpeg', data: value });
	}).catch(err=>{
		console.log(err);
	})
});

router.get('/file', function(req, res, next) { 

	(async () => {
		const file_content = await readfile_txt(file_path);
		console.log('done'+file_content); 
		res.render('index', { title: file_content });

	})().catch(err => {
		console.log(err)
	})
});

module.exports = router;
