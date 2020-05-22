const rs = (res, data) => {
  return res.json({
    status:'ok',
    data:data
  });
};

module.exports = rs;