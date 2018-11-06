const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

client.on('ready', () => {  
    console.log("DIDS has been successfully launched!\nAwaiting to join a guild...");
    
});

client.on("guildCreate", async function(guild) { //On GuildCreate(On joining a server)
    if (fs.existsSync('./id-scrape-' + guild.id + ".json") == true) {      
        console.log("Sorry, scrape failed because there is already a scraped list existing in the directory with the guild ID:", guild.id);	
        process.exit();	  
      } else {
        console.log("Joined a new guild, Scraping has been started. Guild's ID:", guild.id)
        var id = []; // Declaring the User IDs Array(Storage)
        var bots = []; // Declaring the Bot Names Array(Storage)
        await guild.members.forEach(m => { // For each members...
          if(m.user.bot){
            bots.push(m.user.username); // If the member is a bot, push the bot's username to "bots" array
            return; // return null;
          }
          else{ 
            id.push(`${m.id}`);  //if the member isn't a bot, push the member's id to the "id" array
          }  
        })
        fs.writeFile("./id-scrape-" + guild.id + ".json", JSON.stringify(id), function(err) { // Write a JSON file with the "id" array
            if (err){
                console.log("Error while writing the file", err); // If error occurs, log it.
            }
            else {
                if(bots.length >= 1){
                // Log the bot name(s) that were caught during the scrape.
                console.log(`Sorry, during the scrape; i couldn't scrape a bot. Bot Name:`, bots.toString()); 
                console.log("Successfully scraped user ids. Users scraped:", id.length);
                id.length = 0; //Clear the "id" arrary(Preventing future clog ups and caching issues)
                bots.length = 0; //Clear the "bots" arrary(Preventing future clog ups and caching issues)
                console.log("Script has been successfully terminated.");
                process.exit();
                }
                else{
                // Log how many users that were scraped with the success message.
                console.log("Successfully scraped user ids. Users scraped:", id.length);
                id.length = 0; //Clear the "id" arrary(Preventing future clog ups and caching issues)
                bots.length = 0; //Clear the "bots" arrary(Preventing future clog ups and caching issues)
                console.log("Script has been successfully terminated.");
                process.exit();
                }
               
            }
        })
      }		  
    
});
    client.login("INSERT_TOKEN_HERE");
