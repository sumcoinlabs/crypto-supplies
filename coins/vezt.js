/**
 * @title Vezt
 * @symbol VZT
 * @ethContractAddr 0x9720b467a710382A232a32F540bDCed7d662a10B
 * @implementation Dynamic
 * @cmcId vezt
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x9720b467a710382A232a32F540bDCed7d662a10B?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -18)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
