export function autocomplete(inp, arr) {
  var curFocus;

      inp.addEventListener("input", function(e) {
          var a, b, i, val = this.value;
          closeAllLists();
          if (!val) { return false;}
          curFocus = -1;
          a = document.createElement("DIV");
          a.setAttribute("id", this.id + "autocomplete-list");
          a.setAttribute("class", "autocomplete-items");
          a.style.backgroundColor= "#FFFFFF";
          a.style.width = "40%";
          a.style.border = "1px solid #01796F";
          a.style.maxHeight = "500px";
           this.parentNode.appendChild(a);
          /*for each item in the array...*/
          for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
              b = document.createElement("DIV");
              b.style.height="24px";
              b.style.cursor="pointer";
              b.style.lineHeight = "24px";
              b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(val.length);
              b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
                  inp.value = this.getElementsByTagName("input")[0].value;
                  closeAllLists();
              });
              a.appendChild(b);
            }
          }
      });
      inp.addEventListener("keydown", function(e) {
          var x = document.getElementById(this.id + "autocomplete-list");
          if (x) x = x.getElementsByTagName("div");
          if (e.keyCode == 40) {
            curFocus++;
            addActive(x);
          } else if (e.keyCode == 38) { //up
            curFocus--;
            addActive(x);
          } else if (e.keyCode == 13) {
            e.preventDefault();
            if (curFocus > -1) {
              if (x) x[curFocus].click();
            }
          }
      });
      function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (curFocus >= x.length) curFocus = 0;
        if (curFocus < 0) curFocus = (x.length - 1);
        x[curFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
  
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
    }