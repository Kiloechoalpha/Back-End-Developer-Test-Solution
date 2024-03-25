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


// Task 4: Count total number of people reporting to Michael Phalane in the ENGINEERING department
function countReports() {
    const uniqueUsers = require('./uniqueUsers.json');
    const michaelReports = uniqueUsers.filter(user => user.department === "ENGINEERING" && (user.manager === "Michael Phalane" || user.manager === "Michael Phalane "));
    const totalReports = michaelReports.reduce((acc, user) => acc + user.reports, 0);
    console.log(`Total number of people reporting to Michael Phalane: ${totalReports}`);
}


// Execute tasks
removeDuplicates();
createCSV();
sortUsers();
countReports();


/*
*    Instructions for execution
*
* Install Node.js .
* Place the`usersBackEnd.json` file in the same directory as this script.
* Execute the script using Node.js: `node script.js`.
* The script will generate `uniqueUsers.json`, `usersCount.csv`, and `orderedUsers.json` in the same directory.
*
*
*/
