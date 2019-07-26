const PAGE ={
  data: {
    index: 0,
    duration: 500,
    isLock: false,
    translateX: 0,
    defaultLenght: null,
    itemWidth: null,
    offsetitemHeight: 426,
    itemHeight: 70,
    itemfixed: false,
    itemCount: 5,
  },
  init :function(){
    this.clone();
    this.bind();
  },
  clone: function(){
    PAGE.data.defaultLenght = $('.teacher-section-person-item').length;
    let itemWidth=$('.teacher-section-person-item').width();
    for (let i = 0; i < PAGE.data.itemCount-1 ; i++) {
       $($('.teacher-section-person-item')[i]).clone().appendTo('#teacher-item');
    }
    let item = $('.teacher-section-person-item').eq(PAGE.data.itemCount-1).clone();
    $('.teacher-section-person').prepend(item);
    $('.teacher-section-person').css('transform',`translateX(-${itemWidth}px)`)        
  },
  bind: function(){
    $('.right-swipper').on('click',this.rmoveitem);
    $('.left-swipper').on('click',this.lmoveitem);
    $('.watch-section-content-left-title').on('click',this.conslide);
    $(window).on('scroll',this.scrollup);
    $('.banner-nav-item').on('click',this.tomoveitem);
    $('.watch-section-content-text').on('click',this.tovideo);
  },
  rmoveitem: function(){
    let isLock = PAGE.data.isLock;
    if(isLock){
      return  
    }
    PAGE.data.index+=1;
    let index = PAGE.data.index;
    PAGE.moveitem(index);
  },
  lmoveitem: function(){
    let isLock = PAGE.data.isLock;
    if(isLock){
      return  
    }
    PAGE.data.index-=1;
    let index = PAGE.data.index;
    PAGE.moveitem(index);
  },
  moveitem:function(index){
    PAGE.data.isLock= true;
    let duration = PAGE.data.duration;
    let itemWidth=$('.teacher-section-person-item').width();
    PAGE.data.itemWidth = itemWidth;
    let translateX = -(index*itemWidth);
    $('.teacher-section-person').animate({'left':`${translateX}px`},duration,function(){
       if (index=== PAGE.data.itemCount) {
        PAGE.data.index = PAGE.data.itemCount - 5;
        let index = PAGE.data.index;
        translateX = -( index * itemWidth);
        $('.teacher-section-person').css('left',`${translateX}px`)           
       }
       if(index === PAGE.data.itemCount-6){
        PAGE.data.index = PAGE.data.itemCount - 1;
        let index = PAGE.data.index;
        translateX = - ( index * itemWidth); 
        $('.teacher-section-person').css('left',`${translateX}px`)            
       }
       PAGE.data.isLock=false;
    })
  },
  conslide: function(){
    $(this).next().slideToggle('slow');
    $(this).addClass('active').siblings().removeClass('active');
  },
  scrollup: function(){
    PAGE.itemfixed();
    PAGE.itemLight();
  },
  itemfixed: function(){
    let scroll = $(window).scrollTop();
    let fixed = scroll>(PAGE.data.offsetitemHeight + PAGE.data.itemHeight);
    if (PAGE.data.itemfixed !== fixed) {
      PAGE.data.itemfixed = fixed;
      if (fixed) {
        $('.banner-nav').addClass('active')         
      }else{
        $('.banner-nav').removeClass('active')
      }
    }
  },
  itemLight: function(){
    let scroll = $(window).scrollTop();
    let itemNav;
    $.each($('.heightcon'),(index,item)=>{
      $('.banner-nav-item').removeClass('active');
      if(scroll>=item.offsetTop-PAGE.data.itemHeight){
        itemNav= $($('.banner-nav-item')[index]);
      }
    })
    $(itemNav).addClass('active');
  },
  tomoveitem: function(){
    let id = $(this).attr('data-nav');
    let offsetTop = $(`#${id}`).offset().top;
    $('html,body').animate({
      scrollTop: offsetTop
    },1000)
  },
  tovideo: function(){
    let Src = $(this).attr('data-src');
    $('#watch-video').attr('src',Src);
    $('#watch-video').trigger('play');
  }
}
PAGE.init();
