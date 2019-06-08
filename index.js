const gpxStat = require('route-stat'),
    fs = require('fs');
var filePath = './data/Problem.gpx';
//from file
fs.readFile(filePath, function(err, data) {
    var stat = gpxStat.fromGpx(data);
    unitKeys = ['_timeUnit', '_lengthUnit', '_speedUnit'];
    statKeys = ['maxSpeed', 'meanSpeed', 'totalDistance', 'totalElevation', 'movingTime', 'totalDuration'];
    stat.then(function(results) {
        unitKeys.forEach(function(unit) {
            console.log(unit.toUpperCase() + ': ', results[unit]);
        });

        var maxSpeed = 0;
        results['speed'].forEach(function(curSpeed, idx) {
            if (curSpeed > maxSpeed) {
                maxSpeed = curSpeed;
            }
        });
        results.maxSpeed = maxSpeed;

        var movingTime = 0;

        results['cumulDistance'].forEach(function(distance, idx) {
            if (distance > 0) {
                movingTime += results['cumulDuration'][idx];
            }
        });

        results.movingTime = movingTime;

        statKeys.forEach(function(key) {
            console.log(key.toUpperCase() + ': ', results[key]);
        });
    });
});