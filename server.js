var falcor = require('falcor');
var FalcorServer = require('falcor-express');
var bodyParser = require('body-parser');
var express = require('express');
var Router = require('falcor-router');
var app = express();

var data = {
    names: [
        {name: 'a'},
        {name: 'b'},
        {name: 'c'}
    ]
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/model.json', FalcorServer.dataSourceRoute(function(req, res) {
    return new NamesRouter();
}));

app.use(express.static('.'));

var server = app.listen(9090, function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("navigate to http://localhost:9090")
});

var NamesRouter = Router.createClass([
    {
        route: "names[{integers:nameIndexes}]['name']",
        get: function(pathSet) {
            var results = [];
            pathSet.nameIndexes.forEach(function(nameIndex) {
                if (data.names.length > nameIndex) {
                    results.push({
                        path: ['names', nameIndex, pathSet[2]],
                        value: data.names[nameIndex].name
                    })
                }
            });
            return results
        }
    },
    {
        route: "names.add",
        call: function(callPath, args) {
            var newName = args[0];

            data.names.push({name: newName})

            return {
                path: ['names', data.names.length-1, 'name'],
                value: newName
            };
        }
    }
])