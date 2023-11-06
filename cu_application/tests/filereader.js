var fs = require('fs'); 

fs.readFile('static/src/ratings.txt', 'utf8', function(err, data){ 
    years = [2017, 2018, 2019, 2020, 2021]
    journal_list = {"scopus": 100,"web_of_science": 2.9, "others":1}
    
    console.log(data);
    
    if(data["journal"] == "scopus"){
        c_score = journals[data["journal"]] * bank[row][column]
    }
    else{
        c_score = journals[data["journal"]]
    }
    return c_score
});    
