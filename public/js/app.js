console.log('javascript no frontend')

const cotacoesForm = document.querySelector('form')
const mainMessage = document.querySelector('h3')
const openPrice = document.querySelector('#open')
const closePrice = document.querySelector('#close')
const highPrice = document.querySelector('#high')
const lowPrice = document.querySelector('#low')

cotacoesForm.addEventListener('submit', (e) => {
    mainMessage.innerText = 'Buscando...'
    e.preventDefault();
    const ativo = document.querySelector('input').value;
    
    if(!ativo) {
        mainMessage.innerText = 'O ativo deve ser informado.'
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            mainMessage.innerHTML = `<span style="color:red;">Houve um erro na execução</span>`
            openPrice.innerText = `Causa: Código ${data.error.code} - ${data.error.message}`
            closePrice.innerHTML = '';
            highPrice.innerHTML = '';
            lowPrice.innerHTML = '';
        } else {
            mainMessage.innerHTML = data.symbol;
            openPrice.innerHTML = `<img src="/img/open.png"> ${data.open}`;
            closePrice.innerHTML = `<img src="/img/close.png"> ${data.close}`;
            highPrice.innerHTML = `<img src="/img/up.png"> ${data.high}`;
            lowPrice.innerHTML = `<img src="/img/down.png"> ${data.low}`;
        }
    })
})
})