document.addEventListener('DOMContentLoaded', () => {
    const coachesContainer = document.getElementById('coaches-container');
    const modal = document.getElementById('coach-modal');
    const closeModal = document.querySelector('.close');
    const coachName = document.getElementById('coach-name');
    const coachImages = document.getElementById('coach-images');
    const coachInfo = document.getElementById('coach-info');
    const coachPhone = document.getElementById('coach-phone');
  
    // Coach data (could be fetched from API)
    const coaches = [
      { id: 1, name: "John Smith" },
      { id: 2, name: "Jane Doe" },
      { id: 3, name: "Mark Taylor" }
    ];
  
    // Generate coach selection list
    coaches.forEach(coach => {
      const coachElement = document.createElement('div');
      coachElement.classList.add('coach-item');
      coachElement.textContent = coach.name;
      coachElement.addEventListener('click', () => {
        fetch(`/coach/${coach.id}`)
          .then(response => response.json())
          .then(data => {
            // Fill modal with coach data
            coachName.textContent = data.name;
            coachImages.innerHTML = data.images.map(img => `<img src="${img}" alt="${data.name}">`).join('');
            coachInfo.textContent = data.info;
            coachPhone.textContent = data.phone;
            modal.style.display = 'block';
          });
      });
      coachesContainer.appendChild(coachElement);
    });
  
    // Close modal
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  