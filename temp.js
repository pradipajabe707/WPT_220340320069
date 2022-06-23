
const express = require('express');
const app = express();

const mysql= require('mysql2');


app.use(express.static('abc'));



app.get('/getbookdetails',  (req, res) => {
    
	
        console.log("ajax called");

		const database ={

			host: 'localhost',
			user: 'root',
			password: 'CDAC',
			database: 'wpt',
			port:3306
		}

		const connection = mysql.createConnection(database);

		let output = {
			bookfoundstatus: false,
			bookdetalis: { bookid: 1, bookname: "java", price: 200 },
		  };
		  let bookid = req.query.bookid;

		  connection.query('select bookid , bookname , price from book where bookid = ?' ,[bookid] ,(error , rows)=>{
			if(error){
				console.log(error);
			}
			else{
				if(rows.length>0){

					output.bookfoundstatus=true;
					output.bookdetalis=rows[0];

				}
				else{
					console.log("no data found");
				}
			}
			res.send(output);
		  } );
    
	});

	app.get('/updatebook',  (req, res) => {
    
	
        console.log("ajax called");

		const database ={

			host: 'localhost',
			user: 'root',
			password: 'CDAC',
			database: 'wpt',
			port:3306
		}

		const connection = mysql.createConnection(database);

		let output = {
			bookfoundstatus: false,
		  };
		  let bookid = req.query.bookid;
		  let price = req.query.price;

		  connection.query('update book set price = ? where bookid =? ',[price ,bookid] ,(error , res)=>{
			if(error){
				console.log(error);
			}
			else{
				if(res.affectedRows>0){

					output.bookfoundstatus=true;

				}
				else{
					console.log("not update");
				}
			}
			res.send(output);
		  } );
    
	});
	app.listen(3000);



