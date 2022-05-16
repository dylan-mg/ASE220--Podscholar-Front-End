// ! type "serve" to run this server. Serve.bat launches nodemon with this server
// if there's any environmental stuff, include the module
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const URL = process.env.MONGOURI;
const mongoClient = mongo.MongoClient;
const dbName = process.env.dbname // name of database for mongoDB

var db;
mongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Error connecting to MongoDB');
        throw err;
    }
    try {
        db = client.db(dbName);
    } catch (error) {
        console.log('Error finding database');
        throw error;
    }

})

// search for author
router.get('/authors/:author', function(req, res) {
        var author = req.params.author;
        db.collection('podcasts').find({ author: author }).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        })
    })
    // search for doi
router.get('/doi/:doi', function(req, res) {
        var doi = req.params.doi;
        db.collection('podcasts').find({ doi: doi }).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        })
    })
    // search for keyword in database
router.get('/keyword/:keyword', function(req, res) {
        var keyword = req.params.keyword;
        db.collection('podcasts').find({ keywords: keyword }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search for date in database
router.get('/date/:date', function(req, res) {
        var date = req.params.date;
        db.collection('podcasts').find({ date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category and keyword in database
router.get('/categories/:scientific_discipline/keyword/:keyword', function(req, res) {
        var category = req.params.scientific_discipline;
        var keyword = req.params.keyword;
        db.collection('podcasts').find({ categories: category, keywords: keyword }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category and doi in database
router.get('/categories/:scientific_discipline/doi/:doi', function(req, res) {
        var category = req.params.scientific_discipline;
        var doi = req.params.doi;
        db.collection('podcasts').find({ categories: category, doi: doi }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category and author in database
router.get('/categories/:scientific_discipline/authors/:author', function(req, res) {
        var category = req.params.scientific_discipline;
        var author = req.params.author;
        db.collection('podcasts').find({ categories: category, author: author }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category and date in database
router.get('/categories/:scientific_discipline/date/:date', function(req, res) {
        var category = req.params.scientific_discipline;
        var date = req.params.date;
        db.collection('podcasts').find({ categories: category, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search keyword and date in database
router.get('/keywords/:keyword/date/:date', function(req, res) {
        var keyword = req.params.keyword;
        var date = req.params.date;
        db.collection('podcasts').find({ keywords: keyword, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search keyword and doi in database
router.get('/keywords/:keyword/doi/:doi', function(req, res) {
        var keyword = req.params.keyword;
        var doi = req.params.doi;
        db.collection('podcasts').find({ keywords: keyword, doi: doi }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search keyword and author in database
router.get('/keywords/:keyword/authors/:author', function(req, res) {
        var keyword = req.params.keyword;
        var author = req.params.author;
        db.collection('podcasts').find({ keywords: keyword, author: author }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search author and date in database
router.get('/authors/:author/date/:date', function(req, res) {
        var author = req.params.author;
        var date = req.params.date;
        db.collection('podcasts').find({ author: author, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category, keyword and date in database
router.get('/categories/:scientific_discipline/keywords/:keyword/date/:date', function(req, res) {
        var category = req.params.scientific_discipline;
        var keyword = req.params.keyword;
        var date = req.params.date;
        db.collection('podcasts').find({ categories: category, keywords: keyword, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category, keyword and author in database
router.get('/categories/:scientific_discipline/keywords/:keyword/authors/:author', function(req, res) {
        var category = req.params.scientific_discipline;
        var keyword = req.params.keyword;
        var author = req.params.author;
        db.collection('podcasts').find({ categories: category, keywords: keyword, author: author }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category, author and date in database
router.get('/categories/:scientific_discipline/authors/:author/date/:date', function(req, res) {
        var category = req.params.scientific_discipline;
        var author = req.params.author;
        var date = req.params.date;
        db.collection('podcasts').find({ categories: category, author: author, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search keyword, author and date in database
router.get('/keywords/:keyword/authors/:author/date/:date', function(req, res) {
        var keyword = req.params.keyword;
        var author = req.params.author;
        var date = req.params.date;
        db.collection('podcasts').find({ keywords: keyword, author: author, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search author and doi in database
router.get('/authors/:author/doi/:doi', function(req, res) {
        var author = req.params.author;
        var doi = req.params.doi;
        db.collection('podcasts').find({ author: author, doi: doi }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search date and doi in database
router.get('/api/search/date/:date/doi/:doi', function(req, res) {
        var date = req.params.date;
        var doi = req.params.doi;
        db.collection('podcasts').find({ date: date, doi: doi }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category, keyword, author and date in database
router.get('/categories/:scientific_discipline/keywords/:keyword/authors/:author/date/:date', function(req, res) {
        var category = req.params.scientific_discipline;
        var keyword = req.params.keyword;
        var author = req.params.author;
        var date = req.params.date;
        db.collection('podcasts').find({ categories: category, keywords: keyword, author: author, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category, keyword, author and doi in database
router.get('/categories/:scientific_discipline/keywords/:keyword/authors/:author/doi/:doi', function(req, res) {
        var category = req.params.scientific_discipline;
        var keyword = req.params.keyword;
        var author = req.params.author;
        var doi = req.params.doi;
        db.collection('podcasts').find({ categories: category, keywords: keyword, author: author, doi: doi }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category, keyword, doi and date in database
router.get('/categories/:scientific_discipline/keywords/:keyword/doi/:doi/date/:date', function(req, res) {
        var category = req.params.scientific_discipline;
        var keyword = req.params.keyword;
        var doi = req.params.doi;
        var date = req.params.date;
        db.collection('podcasts').find({ categories: category, keywords: keyword, doi: doi, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category, author, doi and date in database
router.get('/categories/:scientific_discipline/authors/:author/doi/:doi/date/:date', function(req, res) {
        var category = req.params.scientific_discipline;
        var author = req.params.author;
        var doi = req.params.doi;
        var date = req.params.date;
        db.collection('podcasts').find({ categories: category, author: author, doi: doi, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search keyword, author, doi and date in database
router.get('/keywords/:keyword/authors/:author/doi/:doi/date/:date', function(req, res) {
        var keyword = req.params.keyword;
        var author = req.params.author;
        var doi = req.params.doi;
        var date = req.params.date;
        db.collection('podcasts').find({ keywords: keyword, author: author, doi: doi, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search category, keyword, author, doi and date in database
router.get('/categories/:scientific_discipline/keywords/:keyword/authors/:author/doi/:doi/date/:date', function(req, res) {
        var category = req.params.scientific_discipline;
        var keyword = req.params.keyword;
        var author = req.params.author;
        var doi = req.params.doi;
        var date = req.params.date;
        db.collection('podcasts').find({ categories: category, keywords: keyword, author: author, doi: doi, date: date }).sort({ _id: -1 }).limit(10).toArray(function(err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            res.send(result);
        })
    })
    // search one of each in database
router.get('/:options', function(req, res) {
    var options = req.params.options;
    var selected = [];
    var keyword, date, category, author, doi;
    options.split('_')
    for (i = 0; i < options.length; i++) {
        options.split(':')
    }
    for (i = 0; i < options.length; i++) {
        if (options[i][0] == 'category') {
            category = options[i][1];
            selected.append('category')
        } else if (options[i][0] == 'keyword') {
            keyword = options[i][1];
            selected.append('keyword')
        } else if (options[i][0] == 'date') {
            date = options[i][1];
            selected.append('date')
        } else if (options[i][0] == 'author') {
            author = options[i][1];
            selected.append('author')
        } else if (options[i][0] == 'doi') {
            doi = options[i][1];
            selected.append('doi')
        }
    }
    if (selected.length > 1) {
        var selectedArranged = [];
        var kholder;
        var dholder;
        var aholder;
        var doholder;
        for (i = 0; i < selected.length; i++) {
            if (selected[i] == 'category') {
                selectedArranged.append['category']
            } else if (selected[i] == 'keyword') {
                if (selectedArranged.length == 1) {
                    selectedArranged.append['keyword']
                } else {
                    kholder = 'keyword'
                }
            } else if (selected[i] == 'date') {
                if (selectedArranged.length == 4) {
                    selectedArranged.append['date']
                } else {
                    dholder = 'date'
                }
            } else if (selected[i] == 'author') {
                if (selectedArranged.length == 2) {
                    selectedArranged.append['author']
                } else {
                    aholder = 'author'
                }
            } else if (selected[i] == 'doi') {
                if (selectedArranged.length == 3) {
                    selectedArranged.append['doi']
                } else {
                    doholder = 'doi'
                }
            }
        }
        if (kholder == 'keyword') {
            selectedArranged.append['keyword']
        }
        if (aholder == 'author') {
            selectedArranged.append['author']
        }
        if (doholder == 'doi') {
            selectedArranged.append['doi']
        }
        if (dholder == 'date') {
            selectedArranged.append['date']
        }
    }
    if (selected.length == 1) {
        if (selected[0] == 'category') {
            res.redirect('/api/search/categories/' + category)
        } else if (selected[0] == 'keyword') {
            res.redirect('/api/search/keywords/' + keyword)
        } else if (selected[0] == 'date') {
            res.redirect('/api/search/date/' + date)
        } else if (selected[0] == 'author') {
            res.redirect('/api/search/authors/' + author)
        }
    } else if (selected.length == 2) {
        if (selected[0] == 'category' && selected[1] == 'keyword') {
            res.redirect('/api/search/categories/' + category + '/keywords/' + keyword)
        } else if (selected[0] == 'category' && selected[1] == 'date') {
            res.redirect('/api/search/categories/' + category + '/date/' + date)
        } else if (selected[0] == 'keyword' && selected[1] == 'date') {
            res.redirect('/api/search/keywords/' + keyword + '/date/' + date)
        } else if (selected[0] == 'category' && selected[1] == 'author') {
            res.redirect('/api/search/categories/' + category + '/authors/' + author)
        } else if (selected[0] == 'keyword' && selected[1] == 'author') {
            res.redirect('/api/search/keywords/' + keyword + '/authors/' + author)
        } else if (selected[0] == 'date' && selected[1] == 'author') {
            res.redirect('/api/search/date/' + date + '/authors/' + author)
        } else if (selected[0] == 'category' && selected[1] == 'doi') {
            res.redirect('/api/search/categories/' + category + '/doi/' + doi)
        } else if (selected[0] == 'keyword' && selected[1] == 'doi') {
            res.redirect('/api/search/keywords/' + keyword + '/doi/' + doi)
        } else if (selected[0] == 'doi' && selected[1] == 'date') {
            res.redirect('/api/search/doi/' + doi + '/date/' + date)
        } else if (selected[0] == 'author' && selected[1] == 'doi') {
            res.redirect('/api/search/authors/' + author + '/doi/' + doi)
        }
    } else if (selected.length == 3) {
        if (selected[0] == 'category' && selected[1] == 'keyword' && selected[2] == 'date') {
            res.redirect('/api/search/categories/' + category + '/keywords/' + keyword + '/date/' + date)
        } else if (selected[0] == 'category' && selected[1] == 'author' && selected[2] == 'date') {
            res.redirect('/api/search/categories/' + category + '/authors/' + author + '/date/' + date)
        } else if (selected[0] == 'keyword' && selected[1] == 'author' && selected[2] == 'date') {
            res.redirect('/api/search/keywords/' + keyword + '/authors/' + author + '/date/' + date)
        } else if (selected[0] == 'category' && selected[1] == 'keyword' && selected[2] == 'author') {
            res.redirect('/api/search/categories/' + category + '/keywords/' + keyword + '/authors/' + author)
        } else if (selected[0] == 'category' && selected[1] == 'keyword' && selected[2] == 'doi') {
            res.redirect('/api/search/categories/' + category + '/keywords/' + keyword + '/doi/' + doi)
        } else if (selected[0] == 'category' && selected[1] == 'author' && selected[2] == 'doi') {
            res.redirect('/api/search/categories/' + category + '/authors/' + author + '/doi/' + doi)
        } else if (selected[0] == 'keyword' && selected[1] == 'author' && selected[2] == 'doi') {
            res.redirect('/api/search/keywords/' + keyword + '/authors/' + author + '/doi/' + doi)
        } else if (selected[0] == 'author' && selected[1] == 'doi' && selected[2] == 'date') {
            res.redirect('/api/search/authors/' + author + '/doi/' + doi + '/date/' + date)
        }
    } else if (selected.length == 4) {
        if (selected[0] == 'category' && selected[1] == 'keyword' && selected[2] == 'author' && selected[3] == 'date') {
            res.redirect('/api/search/categories/' + category + '/keywords/' + keyword + '/author/' + author + '/date/' + date)
        } else if (selected[0] == 'category' && selected[1] == 'keyword' && selected[2] == 'doi' && selected[3] == 'date') {
            res.redirect('/api/search/categories/' + category + '/keywords/' + keyword + '/doi/' + doi + '/date/' + date)
        } else if (selected[0] == 'category' && selected[1] == 'author' && selected[2] == 'doi' && selected[3] == 'date') {
            res.redirect('/api/search/categories/' + category + '/authors/' + author + '/doi/' + doi + '/date/' + date)
        } else if (selected[0] == 'keyword' && selected[1] == 'author' && selected[2] == 'doi' && selected[3] == 'date') {
            res.redirect('/api/search/keywords/' + keyword + '/authors/' + author + '/doi/' + doi + '/date/' + date)
        } else if (selected[0] == 'category' && selected[1] == 'keyword' && selected[2] == 'author' && selected[3] == 'doi') {
            res.redirect('/api/search/categories/' + category + '/keywords/' + keyword + '/author/' + author + '/doi/' + doi)
        }
    }
})
module.exports = router