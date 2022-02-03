const initCalc = (parentSelector, btnsSelector, resSelector) => {
    const parent = document.querySelector(parentSelector);
    const btns = document.querySelectorAll(btnsSelector);
    const resultat = document.querySelector(resSelector);
    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const action = ['+', '-', '÷', '*', '√', 'x²'];
    let a = '';
    let b = '';
    let sign = '';
    let finish = false;

    function clearAll(key) {
        if (key === 'AC') {
            a = '';
            b = '';
            sign = '';
            finish = false;
            resultat.textContent = 0;
        }
    };

    function digitFoo(key) {
        if (digit.includes(key)) {
            if (b === '' && sign === '') {
                a += key;
                resultat.textContent = a;
            } else if (a !== '' && b !== '' && finish) {
                b = key;
                finish = false;
                resultat.textContent = b;
            } else {
                b += key;
                resultat.textContent = b;
            }
            return;
        }
    };

    function signFoo(key) {
        if (action.includes(key)) {
            sign = key;
            resultat.textContent = sign;
            return;
        };
    };

    function resFoo(key, val) {
        if (key === '=') {
            switch (val) {
                case '+':
                    a = (+a) + (+b);
                    break;
                case '-':
                    a = (+a) - (+b);
                    break;
                case '*':
                    a = (+a) * (+b);
                    break;
                case '÷':
                    if (b == 0) {
                        resultat.textContent = 'Делить на 0 нельзя';
                        a = '';
                        b = '';
                        sign = '';
                        return;
                    }
                    a = (+a) / (+b);
                    break;
                case '√':
                    a = Math.sqrt(+a);
                    break;
                case 'x²':
                    a = a ** 2;
            }
            finish = true;
            resultat.textContent = a;
            console.log(a);
        }
    }

    parent.addEventListener('click', (e) => {
        const target = e.target;
        const value = target.dataset.jsBtn;

        if (target.classList.contains('calculator__btn')) {
            btns.forEach(btn => {
                if (btn.dataset.jsBtn === value) {
                    // resultat.textContent = '';
                    clearAll(value);
                    digitFoo(value);
                    signFoo(value);
                    resFoo(value, sign);
                };
            });
        };
    });
};

const initTime = (timeSelector) => {
    const time = document.querySelector(timeSelector);
    
    timeFoo();

    function timeFoo() {
        let data = new Date();
        let hours = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours();
        let min = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();

        time.textContent = `${hours}:${min}`;
    };
    setInterval(timeFoo, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    initCalc('.calculator__btns', '.calculator__btn', '.calculator__resultat');
    initTime('.calculator__top-time');
});