const fs = require('fs');

// Task 1: Remove duplicates from usersBackEnd.json and save to uniqueUsers.json
function removeDuplicates() {
    const usersData = require('./usersBackEnd.json');
    const uniqueUsers = Array.from(new Set(usersData.map(user => JSON.stringify(user))));
    fs.writeFileSync('uniqueUsers.json', JSON.stringify(uniqueUsers.map(user => JSON.parse(user)), null, 2));
}

// Task 2: Create CSV file with name, surname, and number of times duplicated
function createCSV() {
    const usersData = require('./usersBackEnd.json');
    const userCountMap = new Map();
    usersData.forEach(user => {
        const key = user.name + ' ' + user.surname;
        userCountMap.set(key, (userCountMap.get(key) || 0) + 1);
    });

    let csvContent = "Name,Surname,Number of times duplicated\n";
    userCountMap.forEach((count, user) => {
        const [name, surname] = user.split(' ');
        csvContent += `"${name}","${surname}",${count}\n`;
    });

    fs.writeFileSync('usersCount.csv', csvContent);
}


// Task 3: Sort unique users by name and save to orderedUsers.json
function sortUsers() {
    const uniqueUsers = require('./uniqueUsers.json');
    uniqueUsers.sort((a, b) => a.name.localeCompare(b.name));
    fs.writeFileSync('orderedUsers.json', JSON.stringify(uniqueUsers, null, 2));
}
