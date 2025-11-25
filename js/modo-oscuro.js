
const btn = document.getElementById("modo-oscuro")
let articuloCategoria = document.querySelectorAll(".articulo-categoria")
let p = document.querySelectorAll("p")
let a = document.querySelectorAll("a")
let h1 = document.querySelectorAll("h1")
const encabezado = document.getElementById("encabezado-principal")
const categoria = document.getElementById("seccion-categoria")
const tituloCategoria =  document.querySelector(".container-titulo-seccion-categoria")

btn.addEventListener("click",function(){
   document.body.classList.toggle("bodyClaro")
   articuloCategoria.forEach(element => {
    element.classList.add("articulo-categoria-claro")
   });
 
    p.forEach(e =>{
    e.classList.toggle("letras-modo-claro")
   })

     a.forEach(e =>{
    e.classList.toggle("letras-modo-claro")
   })

     h1.forEach(e =>{
    e.classList.toggle("letras-modo-claro")
   })

   tituloCategoria.classList.toggle("sin-fondo")
   categoria.classList.toggle("sin-fondo")
   encabezado.classList.toggle("sin-fondo")
   
   
})