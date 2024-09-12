
export function processJSON(data, type) {
    if (type === 'items') {
        data.forEach(category => {
            category.totalCount = category.items.length;
            category.itemData = category.items.map(item => ({ name: item, class_name: category.name, id: item }));
        })
    } else if (type === 'bosses') {
        data.forEach(category => {
            category.totalCount = category.entries.length;
            category.itemData = category.entries.map(entry => ({ name: entry, class_name: category.name, id: entry }));
        })
    } else if (type === 'Walkthrough') {
        data.forEach(category => {
            category.totalCount = category.events.length;
            category.itemData = category.events
                .map(event => {
                    const item = {};
                    item.name = event.text;
                    item.id = stringToHash(event.text);
                    item.class_name = category.name
                    return item;
                })
        })
    }
    return data;
}

// Use to generate unique hash for unstructured data
function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
    }
    // Convert the hash to a Base62 string
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let base62Hash = '';
    const base = characters.length;
    hash = Math.abs(hash);
    while (hash > 0) {
        base62Hash = characters[hash % base] + base62Hash;
        hash = Math.floor(hash / base);
    }

    // Ensure the hash is at least 10 characters long
    base62Hash = base62Hash.padStart(8, 'X').substring(0, 8);
    return base62Hash;
}