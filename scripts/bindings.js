const assert = require('assert');

const bindings = (() => {
    let binding;
    try {
        binding = require('../build/Release/bao_curl_node_addon.node')
        const BaoLibCurl = binding?.BaoLibCurl;
        assert.ok(BaoLibCurl, 'Failed to read target BaoLibCurl from native binary.');
    } catch (error) {
        console.error(error);
        throw new Error('Failed to load native binding.');
    }
    return binding;
})();

module.exports = bindings;