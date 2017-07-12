$(function() {
    
    var carouselHandler = {
        
        $carousel: $('.carousel.mainSlider'),
        $arrowPrev: $('.carouselPrev'),
        $arrowNext: $('.carouselNext'),

        $slideBtn: $('.navBottom .item'),
        
        counter: $('.navBottom .item').length,
        currentSlide: 1,
        
        loopCarousel: function(isPaused,wantLoop){
            this.$carousel.carousel({
                pause: isPaused,
                interval: wantLoop
            }); 
        },
        bindArrow: function(slider, arrow, where){
            arrow.on("click", function(){
                slider.carousel(where)
                carouselHandler.addOrReduceCounter( where )
            })
        },
        addOrReduceCounter( whereIsNext ){
            if( whereIsNext == 'next' ){

                this.currentSlide++;
                if( this.currentSlide > this.counter ){
                    carouselHandler.currentSlide = 1
                }

            } else {

                this.currentSlide--;
                if( this.currentSlide <= 0 ){
                    carouselHandler.currentSlide = carouselHandler.counter
                }

            }
            this.setActiveNavEnement("arrows", this.currentSlide )

        },
        bindNavBottom: function(){
            this.$slideBtn.on("click", function(){
                carouselHandler.currentSlide = $(this).data('slide');
                carouselHandler.setActiveNavEnement("nav", carouselHandler.currentSlide )
            })
        },
        setActiveNavEnement: function( from, item ){
            
            $('.navBottom .item:nth-child(' + item + ')')
                .addClass("active")
                .siblings()
                .removeClass('active')

        },
        init: function(){

            this.bindArrow(carouselHandler.$carousel, this.$arrowPrev, 'prev'),
            this.bindArrow(carouselHandler.$carousel, this.$arrowNext, 'next'),
            this.bindNavBottom(),
            this.loopCarousel(true, false)

        }
    }
    
    carouselHandler.init()
    
    var ratingHandler = {
        
        $ratingStars: $('.productTabs .rating span'),
        $whereToDisplay: $('.productTabs .result span'),
        
        currentRate: 1,
        
        starsBinder: function(){
            this.$ratingStars.on("click", function(){
                ratingHandler.clearBoard();
                $(this).addClass("active").siblings().removeClass("active");
                ratingHandler.currentRate = $(this).data('rate');
                ratingHandler.resultAppend();
                ratingHandler.starsChanger()
            })
        },
        starsChanger: function(){
            this.$ratingStars.each(function(idx, item){
                $(this).removeClass("fa-star-o").addClass("fa-star");
                if( $(this).is(".active") )
                    return false;
            })
        },
        clearBoard: function(){
            this.$ratingStars.removeClass("fa-star")
                .addClass("fa-star-o")
        },
        resultAppend: function(){
            (this.$whereToDisplay).text(this.currentRate)
        },
        init: function(){
            this.starsBinder()
        }
    }
    ratingHandler.init();
    
    var menuHandler = {
        $dropdowns: $('.dropdown-menu'),
        $nextLevelOpener: $('.intoSedondLevel'),
        
        bindClickInto: function(){
            this.$dropdowns.on('click', function (e) {
                e.stopPropagation()
            });
        },
        rwdOpener: function(){
            this.$nextLevelOpener.on("click", function(){
                console.log(this)
                $(this).find('.hiddenSubMenu').toggleClass('open')
            })
        },
        init: function(){
            this.bindClickInto();
            this.rwdOpener()
        }
    }
    
    menuHandler.init();
    
    
    // class => .redux
    // data-letters => number
    var letterReducer = {
    
        $elements: $('.redux'),
        
        loopElements: function(){
            
            this.$elements.each(function(idx, item){
                
                var lth = $(this).data('letters'),
                    txt = $(this).text().trim(),
                    newText = letterReducer.reduceLetters( txt, lth ) + "...";
                
                $(this).html(newText)
            })
            
        },
        reduceLetters: function(text, lgth){
            return text.substr(0,lgth)
        },
        init: function(){
            this.loopElements()
        }
    };
    
    letterReducer.init();
    
    var scrollTop = {
        $all: $('body,html'),
        $arrow: $('.topScoller'),
        
        bindArrow: function(){
            this.$arrow.on("click", function(){
                console.log(this);
                scrollTop.goToTop()
            })
        },
        goToTop: function(){
            this.$all.animate({
				scrollTop: 0
			}, 800);
        },
        init: function(){
            this.bindArrow()
        }
    };
    
    scrollTop.init();
});