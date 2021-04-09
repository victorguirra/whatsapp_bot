const puppeteer = require('puppeteer');

(async function Main(){
    try{

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");

        await page.goto("https://web.whatsapp.com/")

        await page.waitForSelector("._2_1wd");
        await Delay(5000);

        // Nome do contato para enviar mensagens;
        const contactName = "Isabela";
        
        await page.click(`span[title = '${ contactName }']`);
        await page.waitForSelector(".OTBsx");

        const editor = await page.$("div[tabindex='-1']");
        await editor.focus();

        // Quantidade de mensagens a serem enviadas;
        const amountOfMessages = 500;
        //const amountOfMessages = 10;

        for(var i = 0; i <= amountOfMessages; i++){
            await page.evaluate(() => {
                // Definindo mensagem a ser enviada;
                const message = "Você foi escolhido(a) pelo robô!";
                //const message = "Vitu é *Lindo* e fez um robô *foda*!";

                document.execCommand("insertText", false, message);
            });
            await page.click("span[data-testid='send']");
            await Delay(500);
        }        

    }catch(err){
        console.error('Error Mine', err);
    }
})();

function Delay(time){
    return new Promise(function (resolve){
        setTimeout(resolve, time);
    });
}