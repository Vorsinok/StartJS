"use strict"

document.addEventListener("DOMContentLoaded", function (){

    const form =document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

         let error = formValidate(form);
        if (error === 0){
            form.classList.add('_sending');
        }
        else{
            alert("Заповніть обов'язкові поля");
        }

    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req')

        for (let index = 0; index < formReq.length; index++){
            const input =formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if (emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }
           
            if (!input.value){
                formAddError(input);
                error++;
            }
           
        }

        return error;

    }

    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input){
        return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input.value);
    }

    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');

    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file){
        if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)){
            alert('Дозволені тільки зображення');
            formImage.value = '';
            return;
        }

        if (file.size > 2 * 1024 * 1024){
            alert('Файл пофинен бути менше 2мб');
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e){
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert('Помилка');
        };

        reader.readAsDataURL(file);
        
    }
});