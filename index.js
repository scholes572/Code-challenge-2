document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('guest-form');
  const guestName = document.getElementById('guest-name');
  const guestList = document.getElementById('guest-list');
  const guestCategory = document.getElementById('guest-category');
  const searchBox = document.getElementById('search-box');

  let guests = [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (guestName.value.trim()) {
      addGuest(guestName.value.trim(), guestCategory.value);
      guestName.value = '';
      guestCategory.value = '';
    }
  });

  searchBox.addEventListener('input', () => {
    renderList(searchBox.value.trim().toLowerCase()); 
  });

  function addGuest(name, category) {
    if (guestList.children.length >= 10) {
      alert('Guest list is full!');
      return;
    }

    const timestamp = new Date().toLocaleString();

    const guest = { 
      id: Date.now(), 
      name, 
      category, 
      timestamp, 
      attending: false 
    };
    guests.push(guest);
    renderList('');
  }

  function renderList(filter = '') {
    guestList.innerHTML = '';
    guests
      .filter((g) => g.name.toLowerCase().includes(filter))
      .forEach((guest) => {
        const li = document.createElement('li');
        li.classList.add(guest.attending ? 'attending' : 'not-attending');
        if (guest.category) {
          li.classList.add(guest.category);
        }

        li.innerHTML = `
          <span class="timestamp">Added at: ${guest.timestamp}</span><br>
          <strong>${guest.name}</strong> (${guest.attending ? "Attending" : "Not Attending"}) 
          [${guest.category ? guest.category : ''}] 
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remove';
        deleteBtn.onclick = () => {
          guests = guests.filter((g) => g.id !== guest.id);
          renderList(filter);
        };
        li.appendChild(deleteBtn);

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Toggle Attendance';
        toggleBtn.onclick = () => {
          guest.attending = !guest.attending;
          renderList(filter);
        };
        li.appendChild(toggleBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
          const newName = prompt('Enter new name!', guest.name);
          if (newName) {
            guest.name = newName.trim();
            renderList(filter);
          }
        };
        li.appendChild(editBtn);

        guestList.appendChild(li);
      });
  }
});
