const Swal = require('sweetalert2')

export var mails=""

export function hacerSwal(callback){
    firePrimerInput().then((result) => {
      let emails=JSON.stringify(result.value).replaceAll("\"","")
      if(validacionEmail(emails)){
        rechazarEmails()
      }else{
        mails+=emails
        console.log("los emails son ", mails)
        callback()
      }
    });   
  }

function validacionEmail(texto){
   let res=false
   //quiza hay algo
   let emails=texto.split(",")
   let exreg=/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   for(let i=0; i<emails.length; i++){
     console.log(emails[i])
      if(!exreg.test(emails[i])){
        res=true
      }
    }
   return res;
  }

  function firePrimerInput(){
    return Swal.fire({
      title:"Inserte los emails para enviar el evento",
      input: 'textarea',
      confirmButtonText: 'enviar',
      showCancelButton: true,
    })
  }

  export function rechazarEmails(){
    Swal.fire({
      icon: 'error',
      title: 'La lista de emails tiene fallos por favor revísela',
      confirmButtonText: 'aceptar',
    })
  } 