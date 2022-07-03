$(document).ready(function() {
  $(".menuToggle").click(function() {
    $(this).toggleClass("active");
    $('.menu').slideToggle(300, function(){
      if($(this).css('display') === "none"){
        $(this).removeAttr('style');
      }
    });
  });
});

window.addEventListener('DOMContentLoaded' , ()=>{

  // LOADER
const loader = document.querySelector(".loader");
setTimeout(function () {
 loader.style.opacity = 0;
 setTimeout(function () {
   loader.style.display = "none";
 }, 1500);
}, 2000);
  // MODAL

  const modalTrigger = document.querySelectorAll('.data-modal'),
  modal = document.querySelector('.modal'),
  modalCloseBtn = document.querySelector('.data-close');

function funModalTrigger() {
modal.classList.add('show');
modal.classList.remove('hide');
document.body.style.overflow = 'hidden'
}

modalTrigger.forEach(btn=>{
btn.addEventListener('click' , funModalTrigger)
})

function closeModal() {
modal.classList.add('hide');
modal.classList.remove('show');
document.body.style.overflow = ''
}

modalCloseBtn.addEventListener('click' , closeModal)

modal.addEventListener('click', (e)=>{
if (e.target === modal) {
    closeModal()
}
})

document.addEventListener('keydown' , (e)=>{
if(e.code === 'Escape'){
    closeModal();
}
})

  //Form

  const forms = document.querySelectorAll('form');
  const message = {
      loading: 'Загрузка',
      success: 'Спасибо',
      fuilure: 'Что-то пошло не так...'
  }

  forms.forEach(item=>{
      postData(item);
  })

  function postData(form) {
      form.addEventListener('submit',(e)=>{
         e.preventDefault();

         const statusMassage = document.createElement('div');
         statusMassage.classList.add('status');
         statusMassage.textContent = message.loading;
         form.append(statusMassage)

         const request = new XMLHttpRequest();
         request.open('POST', 'server.php');
         
      //    request.setRequestHeader('Content-type', 'multipart/form-data')
         const formData = new FormData(form);
         request.send(formData)
         request.addEventListener('load',()=>{
             if (request.status == 200) {
                 console.log(request.response);
                 statusMassage.textContent = message.success
                 form.reset()
                 setTimeout(()=>{
                     statusMassage.remove();
                 }, 2000)
             }else{
                 statusMassage.textContent = message.fuilure
             }
         })

      })
  }


})