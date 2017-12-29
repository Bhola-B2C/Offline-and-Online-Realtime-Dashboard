var request = require('request');
var r = require('rethinkdb');

r.connect({ host: 'localhost', port: 28015 }, (err,conn) => {
	if(err)	throw err;

	/* For synergy meter*/

	//For first time page load
	r.db('test').table('widget').orderBy({ index: 'time' }).nth(-1).run(conn)
	.then( cursor => {
		//console.log(cursor['value']);
		request.post(
    		'http://localhost:3030/widgets/synergy',
   			{ json: { "auth_token": "YOUR_AUTH_TOKEN", "value": cursor['value'] } },
			function (error, response, body) {
   				if (!error && response.statusCode == 200) {
       				console.log(body)
   				}
    		}
  		)
	})	
	.catch(function(err) {
		console.log(err);
	});

	// For every update
	r.db('test').table('widget').changes().run(conn)
	.then(function(cursor) {
		cursor.each(function(err,row) {
			if(err)	throw err;
			else {
				var string = JSON.stringify(row.new_val);
				var objectValue = JSON.parse(string);
				request.post(
    				'http://localhost:3030/widgets/synergy',
    				{ json: { "auth_token": "YOUR_AUTH_TOKEN", "value": objectValue['value'] } },
    				function (error, response, body) {
        				if (!error && response.statusCode == 200) {
            				console.log(body)
        				}
    				}
  				)
			}
		})
	})
	.catch(function(err) {
		console.log(err);
	});
	/* End of synergy meter */

	/* Start of graph */

	//For first time page load
	r.db('test').table('widget').orderBy({ index: r.desc('time') }).limit(10).run(conn)
	.then( cursor => {
		cursor.toArray( (err, result) => {
			if(err)	throw err;
			var data = [];
			var j=0;
			for(var i=9;i>=0;i--) {
				data[j]={
					'x': j+1,
					'y': result[i]['value']
				}
				j++;
			}
			/*for(var i=0;i<10;i++)
				console.log(data[i]);*/
			request.post(
    			'http://localhost:3030/widgets/rickshawgraph',
    			{ json: { "auth_token": "YOUR_AUTH_TOKEN", "points": data} },
    			function (error, response, body) {
        			if (!error && response.statusCode == 200) {
            			console.log(body)
        			}
    			}
  			)
		});
	})	
	.catch(function(err) {
		console.log(err);
	});

	// For every update
	r.db('test').table('widget').changes().run(conn)
	.then(function(cursor) {
		cursor.each(function(err,row) {
			if(err)	throw err;
			else {
				r.db('test').table('widget').orderBy({ index: r.desc('time') }).limit(10).run(conn)
				.then( cur => {
					cur.toArray( (err, result) => {
						if(err)	throw err;
						var data = [];
						var j=0;
						for(var i=9;i>=0;i--) {
							data[j]={
								'x': j+1,
								'y': result[i]['value']
							}
							j++;
						}
						for(var i=0;i<10;i++)
							console.log(data[i]);
						request.post(
			    			'http://localhost:3030/widgets/rickshawgraph',
    						{ json: { "auth_token": "YOUR_AUTH_TOKEN", "points": data} },
    						function (error, response, body) {
	        					if (!error && response.statusCode == 200) {
            						console.log(body)
        						}
    						}
  						)
					});
				})	
				.catch(function(err) {
					console.log(err);
				});	
			}
		});
	})
	.catch(function(err) {
		console.log(err);
	});


	/*End of graph */
});
