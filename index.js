document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('guest-form');
  const guestName = document.getElementById('guest-name');
  const guestList = document.getElementById('guest-list');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (guestName.value.trim()) {
      addGuest(guestName.value.trim());
      guestName.value = '';
    }
  });

  function addGuest(name) {
    if (guestList.children.length >= 10) {
      alert('Guest list is full!');
      return;
    }

    const li = document.createElement('li');
    li.textContent = name + ' (Not Attending) ';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove'
    deleteBtn.onclick = () => li.remove();

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = ' Attendance...'
    toggleBtn.onclick = () => {
      if (li.textContent.indexOf('(Not Attending)') > -1) {
        li.textContent = name + ' (Attending) ';
      } else {
        li.textContent = name + ' (Not Attending) ';
      }
      li.appendChild(deleteBtn);
      li.appendChild(toggleBtn);
    };

    li.appendChild(deleteBtn);
    li.appendChild(toggleBtn);
    guestList.appendChild(li);
  }
});
