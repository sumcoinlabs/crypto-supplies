/**
 * @title AidCoin
 * @symbol AID
 * @ethContractAddr 0x37e8789bb9996cac9156cd5f5fd32599e6b91289
 * @implementation Dynamic
 * @cmcId aidcoin
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x37e8789bb9996cac9156cd5f5fd32599e6b91289?apiKey=freekey', (error, response, body) => {
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
