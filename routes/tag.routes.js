const tag = require('../controller/tag.controller');
module.exports = function(express){
  const router = express.Router();

  router.get('/', tag.getAll);
  router.post('/', tag.save);
  router.get('/find/:tagId', tag.get);
  router.put('/edit/:tagId', tag.update);
  router.put('/delete/:tagId', tag.delete);
  router.get('/search', tag.search);

  return router;
};