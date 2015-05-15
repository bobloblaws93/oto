var mongo = require('mongodb');
var monk = require('monk');

conn = new Mongo();
db = connect("localhost:27020/nodetest1");

db.adminCommand('listDatabases');
