const reload = document.getElementById('close-form');

reload.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
})


const form_btn = document.querySelectorAll('#form-btn');

form_btn.forEach(f => {
    f.addEventListener('click', (e) => {
        e.preventDefault();
    
        const form = document.getElementById('sait_form');
        form.classList.add('disabled');
    
        const captcha_wrap = document.getElementById('captcha');
        const captcha = document.getElementById('captcha_btn');
    
        captcha.addEventListener('click', (e) => {
            e.preventDefault();
            const grecres = grecaptcha.getResponse();
    
            if(!grecres.length > 0) {
                let ele = document.getElementById('recaptcha_error');
                ele.innerHTML += 'Пройдите проверку';
            } else {
                captcha_wrap.classList.add('disabled');
                form.classList.remove('disabled');
            }
        })
    })
})

IMask(
    document.getElementById('phone-mask'),
    {
      mask: '+{7}(000)000-00-00'
    }
  )