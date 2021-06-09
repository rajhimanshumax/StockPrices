const axios = require('axios');
const stocks = require('../../model/stock');
function fetchController(){
    return {
        async getData(req,res){
            var resp2 = await axios({
                url: "https://api.wazirx.com/api/v2/tickers",
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
            const arrayOfObj = Object.entries(resp2.data).map((e) => ( { [e[0]]: e[1] } ));
            await stocks.deleteMany({});
            for(var i=1;i<=10;i++){
                var buy = arrayOfObj[i-1][Object.keys(arrayOfObj[i-1])[0]]["buy"];
                var last = arrayOfObj[i-1][Object.keys(arrayOfObj[i-1])[0]]["last"];
                var base_unit = arrayOfObj[i-1][Object.keys(arrayOfObj[i-1])[0]]["base_unit"];
                var name = arrayOfObj[i-1][Object.keys(arrayOfObj[i-1])[0]]["name"];
                var sell = arrayOfObj[i-1][Object.keys(arrayOfObj[i-1])[0]]["sell"];
                var volume = arrayOfObj[i-1][Object.keys(arrayOfObj[i-1])[0]]["volume"];
                const stock = new stocks({
                    id:i,
                    name,
                    last,
                    buy,
                    sell,
                    volume,
                    base_unit
                });
                await stock.save();
            }
            const stock = await stocks.find({}).limit(10);
            res.json(stock);
        },
        async display(req,res){
            var resp = await axios({
                url: "http://localhost:3000/getstockprices",
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
            const allstock = await stocks.find({}).limit(10);
            res.render('home',{allstock:allstock});
        }
    }
}
module.exports=fetchController;