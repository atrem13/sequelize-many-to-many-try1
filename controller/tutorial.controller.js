const {
  tutorial,
  tag,
  Sequelize
} = require('../models/index');
const Op = Sequelize.Op;

const rs = require('./function/return_success.function');
const re = require('./function/return_error.function');
const {e_get_id, e_get_all, e_search, e_exist} = require('./variable/action.variable');

let self = {};

self.get = (req, res) => {
  let id = req.params.tutorialId;
  tutorial.findByPk(id,{
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
  tutorial.findAll({
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
  tutorial.findAll({
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
  tutorial.create(req.body)
    .then((data) => {
      if(data){
        rs(res, data);
      }
    }).catch((err) => {
      re(res, err);
    });
};

self.update = (req, res) => {
  let id = req.params.tutorialId;
  tutorial.update(req.body, {
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
  let id = req.params.tutorialId;
  tutorial.remove({
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

self.addTutorialTag = (req, res) => {
  let tutorial_id = req.body.tutorial_id;
  let tag_id = req.body.tag_id;
  tutorial.findByPk(tutorial_id,{}).then((selected_tutorial) => {
    if(!selected_tutorial) {
      re(res, e_get_id);
    }
    tag.findByPk(tag_id,{}).then((selected_tag) => {
      if(!selected_tag){
        re(res, e_get_id);
      }
      selected_tutorial.hasTag(selected_tag).then((check) => {
        if(check){
          re(res, e_exist);
        }
        selected_tutorial.addTag(selected_tag).then((data) => {
          if(data){
            rs(res, data);
          }
        }).catch((err) => {
          re(res, err);
        });
      });
    });
  });  
};

self.removeTutorialTag = (req, res) => {
  let tutorial_id = req.body.tutorial_id;
  let tag_id = req.body.tag_id;
  tutorial.findByPk(tutorial_id,{}).then((selected_tutorial) => {
    if(!selected_tutorial) {
      re(res, e_get_id);
    }
    tag.findByPk(tag_id,{}).then((selected_tag) => {
      if(!selected_tag){
        re(res, e_get_id);
      }
      selected_tutorial.hasTag(selected_tag).then((check) => {
        if(!check){
          re(res, e_exist);
        }
        selected_tutorial.removeTag(selected_tag).then((data) => {
          if(data){
            rs(res, data);
          }
        }).catch((err) => {
          re(res, err);
        });
      });
    });
  });  
};

module.exports = self;
