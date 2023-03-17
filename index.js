const main = document.querySelector('.main');


const form = document.createElement('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputsValue = Object.fromEntries(new FormData(e.target));
    const response = await fetch(`
    https://api.github.com/search/repositories?q=${inputsValue.name}
  `);
    const data = await response.json();
    if (data.items.length) {
        const tenCurrentRepositories = data.items.slice(0, 10);
        const wrapper = createProfileRepositories(tenCurrentRepositories);
        main.appendChild(wrapper);
        searchInput.value = '';
    } else {
        alert("Ничего не найдено")
    }
})

const searchInput = document.createElement('input');
searchInput.classList.add('search-input');
searchInput.setAttribute('name', 'name')

const searchButton = document.createElement('button')
searchButton.classList.add('search-button');
searchButton.setAttribute('type', 'submit');
searchButton.innerHTML = "Поиск";

form.appendChild(searchInput);
form.appendChild(searchButton);
main.appendChild(form);

function createProfileRepositories(profileData) {

    const wrapper = document.createElement('div')
    profileData.forEach(element => {
        const repository = document.createElement('div');
        repository.classList.add('profile');
        repository.innerHTML = `
        <a href="${element.clone_url}" target="blank">${element.clone_url}</a>
      `
        wrapper.appendChild(repository)
    });
    return wrapper;
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        createProfileRepositories();
    }
    return
});

