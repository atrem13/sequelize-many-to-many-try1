const {
  tag,
  Sequelize
} = require('../models/index');
const Op = Sequelize.Op;

const rs = require('./function/return_success.function');
const re = require('./function/return_error.function');
const {e_get_id, e_get_all, e_search} = require('./variable/action.variable');

let self = {};

self.get = (req, res) => {
  let id = req.params.tagId;
  tag.findByPk(id,{
    include:[
      'tags'
    ]
  }).then((data) => {
    if(data){
      rs(res, data);
    }else{
      re(res, e_get_id);
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.getAll = (req, res) => {
  tag.findAll({
    include:[
      'tags'
    ]
  }).then((data) => {
    if(data.length > 0){
      rs(res, data);
    }else{
      re(res, e_get_id);
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.search = (req, res) => {
  let text = req.query.text;
  tag.findAll({
    include:[
      'tags'
    ],
    where:{
      [Op.like]:{
        name:{
          [Op.like]:`%${text}%`
        },
        '$tags.name$':{
          [Op.like]:`%${text}%`
        }
      }
    }
  }).then((data) => {
    if(data.length > 0){
      rs(res, data);
    }else{
      re(res, e_get_id);
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.save = (req, res) => {
  tag.create(req.body)
    .then((data) => {
      if(data){
        rs(res, data);
      }
    }).catch((err) => {
      re(res, err);
    });
};

self.update = (req, res) => {
  let id = req.params.tagId;
  tag.update(req.body, {
    where:{
      id:id
    }
  }).then((data) => {
    if(data[0]){
      rs(res, data);
    }else{
      re(res, e_get_id);
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.delete = (req, res) => {
  let id = req.params.tagId;
  tag.remove({
    where:{
      id:id
    }
  }).then((data) => {
    if(data){
      rs(res, data);
    }else{
      re(res, e_get_id);
    }
  }).catch((err) => {
    re(res, err);
  });
};

module.exports = self;