const readline = require('readline');
const db_manager = require('./DB_Manager');

let userInput = readline.createInterface({
    input : process.stdin,
    output: process.stdout
})
 const db = new db_manager();
userInput.on('line' , (input)  => {
    let curinput = input.split(' ');
    curinput[0]  = curinput[0].toUpperCase();
    let name;
    let score;
    let tindex;
         if(curinput.length > 1)
           {
            if(curinput[1] != null)
               {
                 name = curinput[1];
               }
            if(curinput[2] != null)
               {
                  score = curinput[2];
               }
           }
        switch(curinput[0] )
        {  
            case 'SET':
                db.set(name,score);
                break;  
            case 'GET':
                console.log(db.get(name));
                break;
            case 'DELETE':
                db.delete(name);
                break;
            case 'BEGIN':
                db.begin();
                break;
            case 'ROLLBACK':
                db.rollback();
                break;
            case 'COMMIT':
                tindex = db.commit();
                console.log("transaction commited with index = "+ tindex)
                break;
            case 'UPDATE':
                db.update(name,score);
                break;
            case 'WINNER':
                var arr = db.winner();
              
                break;
            case 'DISPLAYALL':
                db.display();
                break;
            case 'SORTTHELIST':
                db.sortthelist();
                break;
            case 'END':
                userInput.close();
			    console.log('INPUT CLOSED!');
			    break;
            case 'DOWNLOAD':
                db.download();
                 break;
             case 'OPTIONS':
			   console.log("options:\nSET <Key> <Val>\n" +
			   "GET <Key>\nDELETE <Key>\nMAXSCORE <value>\n UPDATE" + 
               "MAXSCORE\n DISPLAYALL\n DOWNLOAD"+
			   "BEGIN\nROLLBACK\nCOMMIT\nEND\n");
			    break;
		     default: 
                console.log('\nInvalid input !!! \n Try Again.') ;
               

             
        }
    
   
})
