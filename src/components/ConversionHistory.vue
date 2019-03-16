<template>
    <div class="mainContainer">
        <div class="searchConatiner">
            <div class="searchInner">
                <div class="w100">
                    <input id="searchInput" @keyup="Emptysearch" v-on:keyup.enter="search(searchTerm)" v-on:keyup="autocomplete()" type="text" class="" v-model="searchTerm" placeholder="Search for restaurants near you" style="border: unset;" autocomplete="on" />
                    <div class="btnDv">
                    <button class="btn new-btn" type="button" @click="search(searchTerm)">
                        <span class="search-icon" >SEARCH</span>
                    </button>
                    </div>
                    <div class="searchResultDv" v-if="tagsBoolean" >Search results for : <span v-for="(tag, index) in tags" :key="index">{{tag}} <span class="close" @click="close($event,index)"> | x</span> </span></div>
                </div>
                
            </div>
        </div>
        <div class="restaurantConatiner">
            <div class="sorterDV">
                    <span>SORT BY: </span>
                    <div class="btnDv">
                    <button class="btn new-btn" type="button"  @click="sortRestaurant(time)">
                        <span class="search-icon">DELIVERY TIME</span>
                    </button>
                    </div>
                    <div class="btnDv">
                    <button class="btn new-btn" type="button" @click="sortRestaurant(rating)">
                        <span class="search-icon">RATINGS</span>
                    </button>
                    </div>
            </div>
            <div class="restCard clearfix" v-for="(restaurant, index) in restaurants" :key="index">
                <div class="restImgDv fLft"><img :src="restaurant.img" /></div>
                <div class="restContentDv fLft">
                    <div class="restName">{{restaurant.name}}</div>
                    <div class="restfoodType">{{restaurant.foodtype.toString()}}</div>
                    <div class="restBottom"><span class="starSpan"><img alt="star image" src="./../assets/img/star.svg" />{{restaurant.starrating}}</span><span class="timeSpan"><img alt="star image" src="./../assets/img/clock.svg" />{{restaurant.timeclosest}} MINS</span></div>
                </div>
            </div>
        </div>

        <!-- <Pagination :options="{page: _page, totalItems: totalItems, limit: _limit}" @onPaginate="paginate"></Pagination> -->
    </div>
</template>

<script>
import AppConversionService from './../service/appConversionService';
import Utils from './../common/Utils';
import { publishEvent } from '../common/Observer';
// import {autocomplete} from "./../service/autoComplete"


export default {
   
    data() {
        return {
            searchTerm:'',
            time:'time',
            rating:'rating',
            restaurants: [],
            tags:[],
            tagsBoolean:false,
            order:'asc',
            page: 1,
            limit: 40,
            totalCount: 30
        }
    },
     components: {
        //Pagination
    },
    created() {
        this.fetchTransactions(this.limit, this.page, null, null);
        // this.autocomplete(document.getElementById("searchInput"), this.restaurants);
    },
    mounted(){
          
            
    },
    methods: {
        close($event,index){
            $event.target.parentNode.remove();
            this.tags.splice(index,1);
            this.searchTerm = this.tags.join(' ');
            console.log(this.tags);
            if(this.tags.length < 1){
                this.tagsBoolean = false;
                this.fetchTransactions(this.limit, this.page, null, null);
            }else{
                this.search(this.searchTerm);
            }
           
        },

        sortRestaurant(sortText){
            sortText == 'time' ? sortText='timeclosest': sortText='starrating';
            this.fetchTransactions(this.limit, this.page, sortText, 'asc') ;
        },

        fetchTransactions(_limit, _page, _sort, _order) {
            AppConversionService.getRestaurant(_limit, _page, _sort, _order)
                .then(response => {
                    console.log(response)
                    this.restaurants = response.data;
                    this.totalCount =  response.headers["x-total-count"];
                    localStorage.setItem('restaurants', JSON.stringify(this.restaurants));
                })
                .catch(error => {
              
                });
        },

        search(text) {
            if (this.searchTerm != '') {
            this.showViewAll = 'false';
            this.tags = [];
            this.tags = text.split(' ');
            this.tagsBoolean =  true;
            } else {
            this.Emptysearch();
            return;
            }
            let searchResults = []
            let searchText = text.toLowerCase();
            for (var i = 0; i < this.restaurants.length; i++) {
            let name = this.restaurants[i].name.toLowerCase().search(searchText);
            const abc = this.restaurants[i].foodtype.filter(foodtypes => foodtypes.toLowerCase().indexOf(searchText) > -1);
            if (name > -1 || abc.length > 0) {
                searchResults.push(this.restaurants[i])
            }
            }
            this.noSearchResults = (searchResults.length == 0) ? true : false
            this.restaurants = [...searchResults];
      },

      Emptysearch() {
           if (this.searchTerm != '') {} else {
            this.noSearchResults = false;
            this.showViewAll = 'true';
            this.fetchTransactions(this.limit, this.page, null, null);
            }
        },
      
        autocomplete(inp, arr) {
            /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
            var currentFocus;
            /*execute a function when someone writes in the text field:*/
            inp.addEventListener("input", function(e) {
                var a, b, i, val = this.value;
                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val) { return false;}
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                this.parentNode.appendChild(a);
                /*for each item in the array...*/
                for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
                }
            });
            /*execute a function presses a key on the keyboard:*/
            inp.addEventListener("keydown", function(e) {
                var x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
                } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
                } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
                }
            });
            function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
            }
            function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
                }
            }
            }
            /*execute a function when someone clicks in the document:*/
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });
    }
    },
    computed:{
        
    }
}
</script>

<style lang="scss" scoped>
.mainContainer {width:100%;
   .searchConatiner{background:url(./../assets/img/foodBg.jpg) no-repeat;background-position:100% 50%;width:100%;height:250px;background-size:cover;position:relative;
    .searchInner{position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);min-width:60%;}
    input{width:80%;}
    .btnDv{display: inline-block;width:16%;padding-left:20px;}
    .searchResultDv{margin-top: 20px;background: lightgrey;padding: 10px;
        span{display:inline-block;background: #fff;padding:2px 4px;margin-right:4px;
        .close{margin:0 2px; cursor:pointer; color: grey;}}
    }
   }
   .restaurantConatiner{
       width:90%;padding:2% 5%;
       .restCard{box-shadow: 0 6px 14px 6px rgba(0, 0, 0, 0.08); width:98%;padding:2%;margin-bottom:30px;
           .restImgDv{width:10%;img{width:110px;height:110px;}}
           .restContentDv{width:88%;
               .restName{font-size:16px;line-height:18px;font-weight:bold;margin-bottom:10px;}
               .restfoodType{font-size:13px;}
               .restBottom{font-size:14px;margin-top:40px;
                .starSpan{display:inline-block;width:10%; img{width:18px;height:18px;vertical-align:-4px;padding-right:4px;}}
                .timeSpan{display:inline-block;width:10%; img{width:16px;height:16px;vertical-align:-3px;padding-right:4px;}}
               
               }
           }
       }
       .sorterDV{margin-bottom:20px;width:100%;
       .btnDv{display: inline-block;width:12%;padding-left:20px;}
       }
   }
  

}

</style>