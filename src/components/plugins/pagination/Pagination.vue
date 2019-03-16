<template>
    <div>
        <!--  Pagination : forward, List and Previous -->
        <div class="pagination-section">
        <div class="pagination-body">

            <div :class="['pagination-previous', ( currentPage === 1 ) ? 'disable-button' : '' ]" @click="goToPreviousPage"></div>

            <div class="pagination-list">
                <div :class="['display-pages', ( pageNumber === currentPage ) ? 'selected-page':'' ]" v-for="pageNumber in pages" v-bind:key="pageNumber" @click="setCurrentPage(pageNumber)">
                    {{ pageNumber }}
                </div>
            </div>

            <div :class="['pagination-next', ( currentPage === totalPages ) ? 'disable-button':'']" @click="goToNextPage"></div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            totalItems: 0,
            offset: 0,
            limit: 10,
            currentPage: 1,
            maxPages: 5,
            totalPages: 0,
            pages: []     
        }
    },
    methods: {
        setCurrentPage(pageNumber) {
            if (this.currentPage < 1) { 
                this.currentPage = 1; 
            } else if (this.currentPage > this.totalPages) { 
                this.currentPage = this.totalPages;
            } else {
                this.currentPage = pageNumber;
            }
            const data = this.paginate();
            this.$emit('onPaginate', data);
        },
        goToPreviousPage() {
            this.setCurrentPage(--this.currentPage);
        },
        goToNextPage() {
            this.setCurrentPage(++this.currentPage);
        },
        paginate() {
            let startPage = 0, endPage = 0;
            if (this.totalPages <= this.maxPages) {
                // total pages less than max so show all pages
                startPage = 1;
                endPage = this.totalPages;
            } else {
                // total pages more than max so calculate start and end pages
                let maxPagesBeforeCurrentPage = Math.floor(this.maxPages / 2);
                let maxPagesAfterCurrentPage = Math.ceil(this.maxPages / 2) - 1;
                if (this.currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = this.maxPages;
                } else if (this.currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
                // current page near the end
                startPage = this.totalPages - this.maxPages + 1;
                endPage = this.totalPages;
                } else {
                // current page somewhere in the middle
                startPage = this.currentPage - maxPagesBeforeCurrentPage;
                endPage = this.currentPage + maxPagesAfterCurrentPage;
                }
            }

            // calculate start and end item indexes
            // let startIndex = (this.currentPage - 1) * this.limit;
            // let endIndex = Math.min(startIndex + this.limit - 1, this.totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            // this.pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
            this.pages = this.generatePageNumbers(this.totalPages, this.currentPage);

            // return object with all pager properties required by the view
            return {
                totalItems: this.totalItems,
                currentPage: this.currentPage,
                pageSize: this.limit,
                totalPages: this.totalPages
            };
        },
        generatePageNumbers(count, current) {
            // console.log(count, current);
            const shownPages = 3;
            const result = [];
            if (current > count - shownPages) {
                if (count > 3) {
                    result.push(1, '...', count - 2, count - 1, count);
                } else {
                    result.push(count - 2, count - 1, count);
                }
            } else {
                result.push(current, current + 1, current + 2, '...', count);
            }
            return result;
        }
    },
    created() {
        this.totalItems = this.options.totalItems || 30
        this.offset = this.options.offset || 0
        this.limit = this.options.limit || 10
        this.maxPages = this.options.maxPages || 5
        this.totalPages = Math.ceil(this.totalItems / this.limit)
        if (this.options.currentPage) {
            this.setCurrentPage(this.options.currentPage)
        } else {
            this.setCurrentPage(1)
        }
    }
}
</script>
<style scoped lang="scss" scoped>
.pagination-section {
    margin-top: 20px;
    text-align: center;
    user-select: none;

    .pagination-body {
        display: inline-block;
        box-sizing: border-box;

        .pagination-previous,
        .pagination-next {
        border: 6px solid transparent;
        width: 6px;
        display: inline-block;
        cursor: pointer;
        }

        .pagination-previous {
        margin-left: 23px;
        border-right: 6px solid #b7b9d0;
        }

        .pagination-list {
            display: inline-block;

            .display-pages {
                cursor: pointer;
                display: inline-block;
                opacity: 0.5;
                color: #190f27;
                vertical-align: center;
                margin-left: 23px;
            }
            .selected-page {
                border-radius: 50%;
                background-color: #3d4ca0;
                color: #ffffff;
                padding: 0 9px;
            }
        }

        .pagination-next {
        margin-left: 23px;
        border-left: 6px solid #b7b9d0;
        }

        .disable-button {
        opacity: 0.3;
        cursor: not-allowed;
        pointer-events: none;
        }
    }
}
</style>
