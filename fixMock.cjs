const fs = require('fs');
const path = 'c:/Users/MarkChristian Garing/OneDrive/Desktop/bayanihanboard_group5/src/mock/mockRequestsDb.ts';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/\{ id: cmt-(\d+), volunteerName:/g, '{ id: "cmt-$1", volunteerName:');
fs.writeFileSync(path, content);
