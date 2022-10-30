$(document).ready(function () {
  $("#del").on("click",function(){$("#output").val($("#output").val().slice(0,-1))})
  $(".imp").on("click",function(){$("#output").val($("#output").val() + $(this).val());});
  $("#clear").on("click", function () { $("#output").val("");});
  $(".oper").on("click", function () {
    const ultimo = $("#output").val().split("")[
      $("#output").val().split("").length - 2
    ];
    let correcto = true;
    if (!ultimo && $(this).val() != "-") {
      $("#output").val("");
      correcto = false;
    }
    if (["-", "+", "*", "/"].includes(ultimo) && $(this).val() != "-") {
      $("#output").val(
        $("#output")
          .val()
          .slice(0, $("#output").val().length - 1)
      );
      correcto = "false";
    }
  });
  $("#equal").on("click", function () {
    let resultado = 0;
    let out = $("#output").val().split("");
    let numero = "";
    let numeros = [];
    let operaciones = [];
    for (let i = 0; i < out.length; i++) {
      if (i == 0) {
        numero += out[i];
      } else {
        let es_num = false;
        if (!isNaN(parseFloat(out[i])) || out[i] == ".") {
          numero += out[i];
          es_num = true;
        }
        if ((out[i] == "-") & ["*", "-", "+", "/"].includes(out[i - 1])) {
          numero += out[i];
          es_num = true;
        }
        console.log("numeroo : ", numero);
        if (es_num) {
          if (i == out.length - 1) {
            numeros.push(parseFloat(numero));
            numero = "";
          }
        } else {
          numeros.push(parseFloat(numero));
          operaciones.push(out[i]);
          numero = "";
        }
      }
    }
    console.log(numeros);
    console.log(operaciones);
    for (let i = 0; i < operaciones.length; i++) {
      if (i == 0) {
        resultado = operar(numeros[0], numeros[1], operaciones[i]);
      } else {
        resultado = operar(resultado, numeros[i + 1], operaciones[i]);
      }
    }
    if (operaciones.length > 0) {
      $("#output").val(resultado);
    }
  });

  function operar(prev_numero, post_numero, oper) {
    switch (oper) {
      case "+":
        return prev_numero + post_numero;
        break;
      case "-":
        return prev_numero - post_numero;
        break;
      case "/":
        return prev_numero / post_numero;
        break;
      case "*":
        return prev_numero * post_numero;
        break;
      default:
        return prev_numero + post_numero;
        break;
    }
  }
  $("#output").keypress(function(e){
    if (e.which == 13) {
        $("#equal").trigger("click")
    }
    
  })
});
