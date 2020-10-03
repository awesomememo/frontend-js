// Need get rid of login and register options once logged in (replace with logout, possibly settings?)

import IndexUI from '../src/ui/IndexUI';

const ui = new IndexUI(document);
let currUser = JSON.parse(localStorage.getItem('currUser'));

window.addEventListener('DOMContentLoaded', () => {
    if (!currUser) {
        return;
    }
    ui.initPage(currUser.username);
});

ui.logoutBtn.addEventListener('click', () => {
    ui.logout();
    currUser = null;
    localStorage.setItem('currUser', JSON.stringify(currUser));
});