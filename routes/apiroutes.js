// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var noteData = require("../db/db.json");
var fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    if(noteData) {
      noteData.push(req.body);
      noteData.forEach((obj, i) => {
        obj.id = i;
      })
      fs.writeFile('./db/db.json', JSON.stringify(noteData, null, 2), (err) => {
        if (err) throw err;
      });
      console.log(noteData);
      res.json(noteData);
    }
  });

  app.delete('/api/notes/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.params.id);
    if(noteData) {
      noteData.splice(id, 1);
      noteData.forEach((obj, i) => {
        obj.id = i;
      })
      fs.writeFile('./db/db.json', JSON.stringify(noteData, null, 2), (err) => {
        if (err) throw err;
      });
      res.json(noteData);
    }
  })
};
