const form = document.querySelector('form');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const grecres = grecaptcha.getResponse();

    if (!grecres.length > 0) {
        let ele = document.getElementById('recaptcha_error');
        ele.innerHTML += 'Пройдите проверку';
        throw new Error("captcha")
        
    }

    fetch;
});

IMask(
    document.getElementById('phone-mask'),
    {
      mask: '+{7}(000)000-00-00'
    }
  )