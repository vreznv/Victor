const form = `
<form>
    <div class="mb-3">
        <label for="where" class="form-label">Откуда-Куда</label>
        <input autocomplete="off" type="text" class="form-control" id="where" placeholder="Введите город">
        <p id="where-notification"></p>
    </div>
    <div class="mb-3">
        <label for="when" class="form-label">Когда</label>
        <input autocomplete="off" type="text" class="form-control" id="when" placeholder="Введите число и месяц">
        <p id="when-notification"></p>
    </div>
    <button type="submit" class="btn btn-primary" id="submit-btn">Найти билеты</button>
</form>
`;

export default function createForm() {
  const container = document.querySelector('.container');
  const h2 = document.querySelector('h2');
  const formElement = document.createElement('div');
  formElement.innerHTML = form;
  container.insertBefore(formElement, h2.nextSibling);

  const whereInput = document.getElementById('where');
  const whenInput = document.getElementById('when');
  const submitBtn = document.getElementById('submit-btn');

  const whereNotification = document.getElementById('where-notification');
  const whenNotification = document.getElementById('when-notification');

  const validateCity = (city) => /^[^-]+-[^-]+$/.test(city);
  const validateDate = (date) => /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])$/.test(date);

  const updateButtonState = () => {
    if (validateCity(whereInput.value) && validateDate(whenInput.value)) {
      submitBtn.classList.remove('btn-danger');
      submitBtn.classList.add('btn-success');
    } else {
      submitBtn.classList.remove('btn-success');
      submitBtn.classList.add('btn-danger');
    }
  };

  const updateWhereNotification = () => {
    whereNotification.textContent = validateCity(whereInput.value) ? 'Валидно' : 'Невалидно';
    whereNotification.className = validateCity(whereInput.value) ? 'text-success' : 'text-danger';
  };

  const updateWhenNotification = () => {
    whenNotification.textContent = validateDate(whenInput.value) ? 'Валидно' : 'Невалидно';
    whenNotification.className = validateDate(whenInput.value) ? 'text-success' : 'text-danger';
  };

  whereInput.addEventListener('input', () => {
    updateWhereNotification();
    updateButtonState();
  });

  whenInput.addEventListener('input', () => {
    updateWhenNotification();
    updateButtonState();
  });

  formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (validateCity(whereInput.value) && validateDate(whenInput.value)) {
      try {
        const response = await fetch('/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            where: whereInput.value,
            when: whenInput.value,
          }),
        });

        if (response.ok) {
          document.body.classList.add('bg-success');
        } else {
          console.error('Ошибка при отправке запроса на сервер');
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса на сервер:', error);
      }
    }
  });
}
