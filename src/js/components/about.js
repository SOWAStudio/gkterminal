export function initAbout() {
  const $aboutTab = $('.about__tab');
  const $aboutBox = $('.about__box');
  const $aboutHeadMobile = $('.about__head-mobile');
  
  $aboutTab.click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $aboutBox.hide();
    $aboutBox.eq($(this).index()).slideDown()
  })
  
  if(window.innerWidth < 1200){
    $aboutHeadMobile.click(function () {
      $aboutHeadMobile.removeClass('active')
      $(this).addClass('active').siblings().removeClass('active');
      $aboutHeadMobile.next().slideUp();
      $(this).next().slideDown()
    })
  }
  
}