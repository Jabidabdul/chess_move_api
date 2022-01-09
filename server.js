const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
const html2json = require('html2json').html2json;
const axios = require('axios');

app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    var config = {
        method: 'get',
        url: 'https://www.chessgames.com/chessecohelp.html',
        headers: { },
        data : ''
      };
      axios(config)
      .then(async function (response) {
        let chess_code, title, move_code;
        let obj = ``;
        const htmlTojson =  (html2json(response.data));
        await htmlTojson.child[0].child[3].child[2].child[1].child.map(element => {
            if(element.child != undefined){
                chess_code = element.child[0].child[0].child[0].text;
                title = element.child[1].child[0].child[0].child[0].text;
                move_code = element.child[1].child[0].child[0].child[3].child[0].text;
                obj += `<div style="display:flex; margin-left:20px">
                            <h2 style="margin-right:10px">${chess_code }</h2>
                            <div>
                                <h4 style="margin:none">${title}</h4>
                                <p style="margin:none">${move_code}</p>
                            </div>       
                        </div>`
                
            }
        });
        res.send(obj);

      })
      .catch(function (error) {
        console.log(error);
      });
})
app.get('/:code', (req, res)=>{
    const param = req.params.code;
    var axios = require('axios');
    var data = '';
    var config = {
    method: 'post',
    url: `https://www.chessgames.com/chessecohelp.html`,
    headers: { },
    data : data
    };
    axios(config)
    .then( async function  (response) {
        let chess_code, title, move_code;
        const htmlTojson =  (html2json(response.data));
        await htmlTojson.child[0].child[3].child[2].child[1].child.map(element => {
            if(element.child != undefined){
                chess_code = element.child[0].child[0].child[0].text;
                title = element.child[1].child[0].child[0].child[0].text;
                move_code = element.child[1].child[0].child[0].child[3].child[0].text;
                if(chess_code == param){
                    res.send(
                        `<div style="display:flex; margin-left:20px">
                            <div>
                                <h4 style="margin:none">${title}</h4>
                                <p style="margin:none">${move_code}</p>
                            </div>       
                        </div>`
                    )
                }
            }
        });
    })
    .catch(function (error) {
    console.log(error);
    });

})

app.listen(PORT, (req, res)=>{
    console.log(`Port listing to: ${PORT}`);
})