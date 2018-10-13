/**
 * @title aelf
 * @symbol ELF
 * @ethContractAddr 0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e
 * @implementation Dynamic
 * @cmcId aelf
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e?apiKey=freekey', (error, response, body) => {
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
