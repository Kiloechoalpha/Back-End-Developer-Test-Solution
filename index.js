const fs = require('fs');

// Task 1: Remove duplicates from usersBackEnd.json and save to uniqueUsers.json
function removeDuplicates() {
    const usersData = require('./usersBackEnd.json');
    const uniqueUsers = Array.from(new Set(usersData.map(user => JSON.stringify(user))));
    fs.writeFileSync('uniqueUsers.json', JSON.stringify(uniqueUsers.map(user => JSON.parse(user)), null, 2));
}

