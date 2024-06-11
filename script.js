const form = document.querySelector('form');
const modal = document.querySelector('.modal');
modal.showModal();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const p1Name = document.getElementById('p1name').value;
    const p2Name = document.getElementById('p2name').value;
    console.log(p1Name);
    console.log(p2Name);
});