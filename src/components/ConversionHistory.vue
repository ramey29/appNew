<template>
    <div class="mainContainer">
        <div class="searchConatiner">
            <div class="searchInner">
                <div class="w100">
                    <input v-model="searchTerm" @keyup="Emptysearch" v-on:keyup.enter="search(searchTerm)" v-on:keyup="Emptysearch()" v-on:keydown="autoComplete()" type="text" class=""  placeholder="Search for restaurants near you" autocomplete="on" id="searchInput"/>
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
import {autocomplete} from "./../service/autoComplete"


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
            autocompleteVar: [],
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
    },
    mounted(){
          
            
    },
    methods: { 
        autoComplete(){
            autocomplete(document.getElementById("searchInput"), this.autocompleteVar);
        },
        
        close($event,index){
            $event.target.parentNode.remove();
            this.tags.splice(index,1);
            this.searchTerm = this.tags.join(' ');
            document.getElementById('searchInput').value = this.searchTerm;
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
                    if(this.autocompleteVar.length < 1){
                        let autoVar = [...new Set(response.data.map(a => a.name))];
                        let x = this.autocompleteVar.concat(autoVar);
                        this.autocompleteVar = [...x]
                        console.log(this.autocompleteVar);
                        localStorage.setItem('autocompleteVar', JSON.stringify(this.autocompleteVar));
                    }
                    
                })
                .catch(error => {
              
                });
        },

        search(text) {
            let x = document.getElementById('searchInput').value;
            this.searchTerm = text = text == x ? text : x;
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
                searchResults.push(this.restaurants[i]);
            }
            }
            this.autocompleteVar.push(text);
            this.noSearchResults = (searchResults.length == 0) ? true : false
            this.restaurants = [...searchResults];
      },

      Emptysearch() {
           if (this.searchTerm != '') {} else {
            this.noSearchResults = false;
            this.showViewAll = 'true';
            this.tagsBoolean =  false;
            this.fetchTransactions(this.limit, this.page, null, null);
            }
        },
      
        
    },
    computed:{
        
    }
}
</script>

<style lang="scss" scoped>
.mainContainer {width:100%;
   .searchConatiner{background:url(./../assets/img/foodBg.jpg) no-repeat;background-position:100% 50%;width:100%;height:250px;background-size:cover;position:relative;
    .searchInner{position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);min-width:60%;}
    input{width:80%;border: unset;position:relative;}
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
