(function() {
    const formHtml = `
      <div id="popup-form" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <form id="embedded-form">
            <div class="mb-4">
              <label class="block text-gray-700">Name</label>
              <input type="text" name="name" class="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Email</label>
              <input type="email" name="email" class="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Phone</label>
              <input type="tel" name="phone" class="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div class="mb-4">
              <label class="flex items-center">
                <input type="checkbox" name="consent" class="mr-2" required />
                I agree to the terms and conditions
              </label>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg">Submit</button>
          </form>
        </div>
      </div>
    `;
  
    document.body.insertAdjacentHTML('beforeend', formHtml);
  
    document.getElementById('embedded-form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = event.target.name.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const consent = event.target.consent.checked;
  
      fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, consent }),
      })
        .then(response => response.json())
        .then(data => {
          alert('Form submitted successfully!');
          document.getElementById('popup-form').remove();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('There was an error submitting the form.');
        });
    });
  })();
  