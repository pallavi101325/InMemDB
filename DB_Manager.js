
const clone = require('clone');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
   const fs = require('fs');
 
   module.exports = class DBmem{
     constructor (){
         this.array = [];
         // array of transactions
         this.index = 0; 
         // index of current transaction
         this.tmode = false;
         // current mode of current transaction
         this.temp ={};
    


         this.delete = function(key){
            if(key){
            if(this.temp) {
                delete this.temp[key];
            }
           }
        }

        this.get = function(key){
            let result  = null;
            if(key)
            {
                result = this.temp[key];

            }
            return result ? result : null;
        }

         this.set = function(key, value){

           if(!this.tmode){
                console.log(`Cannot take the input!!. Expected command: begin`);
                return;
            }

            if(key)
            {
                this.temp[key] = value || null;
            }
          }
         this.begin = function(){
             if(!this.tmode){
                 this.tmode = true;
             }
             
             this.array[this.index] = {};
         }
         this.commit = function(){
            
             this.tmode = false;
              if (this.index >= 0) {
                  
                this.array[this.index] = this.temp || null;
                this.temp = {};
               }
             ++this.index;
             return this.index;
         }
         this.rollback = function(){
             if(this.index == 0)
             {
                 return -1;
             }
             if(this.tmode){
                 this.temp = {};
                
             }
             return this.index - 1;
         }
         this.update = function( key, value){
            if(key){
                if(this.temp.hasOwnProperty(key))
                {
                   this.temp[key] =  value;
                   console.log("Updated");
                }
                else{
                    console.log("key not found");
                }
            }
        }
         this.download = function() {
          
              fs.writeFileSync('./dbase.json', JSON.stringify(this.array),
              function(err) {
                  if(err) {
                      console.log("Error occured while writing the file")
                  }
              }
              );
             console.log("Saving DB to dbase.json");
          
         }
         this.display = function() {
             this.array.forEach( function (entry) {
                 console.log(entry);
             });
         }
         this.sortthelist= function() {
             var items = {};
             this.array.forEach( function(item) {
                for(const key in item) {
                     items[key] = item[key];
                }
             });
             var sortable = [];
             for(var key in items)
             if(items.hasOwnProperty(key))
             sortable.push([key,items[key]]);

             sortable.sort(function(a,b)
             {
                 return a[1] - b[1];
             });
             for (const key in sortable) {
                 console.log(`${sortable[key]}`);
            }
        
         }
         this.winner = function() {
             var max = 0;
             var maxchar;
             this.array.forEach( function(item) {
                for(const key in item) {
                    if(item[key] > max){
                        max = item[key];
                        maxchar = key;
                    }
                }
             });
           console.log(`${maxchar} - ${max}`);
         }
      
      }   
     
 };
