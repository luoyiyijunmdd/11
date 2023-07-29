$(function () {
  let isMobile = false;
  let pageOption = {};
  let weixinData = {};

  // 设置基础字体
  setDefaultFont();
  // 滚动到相应锚点
  setTimeout(function () {
    // 滚动到相应锚点
    getUrlAnchor();
  }, 300);

  let copyRightYear = new Date().getFullYear();
  document.querySelectorAll('.footer-bottom .year').forEach((item) => {
    item.innerHTML = copyRightYear;
  })

  weixinShare();

  function weixinShare () {
    pageOption = {
      title: document.title, // 分享标题
      desc: 'Matrix653 是翼辉信息独立设计和开发的面向航空航天等安全关键（Safety-Critical）领域的专用操作系统', // 分享描述
      link: window.location.href, // 分享链接
      imgUrl: window.location.protocol + '//' + window.location.host + '/images/sharelogo.png', // 分享图标
      success: () => {
        console.log('分享成功')
      },
      error: () => {
        console.log('分享失败')
      }
    }
    getWeixinShareData(window.location.href)
  }

  function getWeixinShareData (url) {
    // 发送ajax请求
    jQuery.ajax({
      type: "GET",
      url: "https://api.edgeros.com/user/common/we_chat_share?url=" + encodeURIComponent(url) + "&domain=acoinfo",
      dataType: "json",
      success: function (result) {
        weixinData = {
          appId: 'wxf3ce495cf3201936', // 必填，公众号的唯一标识
          timestamp: result.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
          signature: result.data.signature // 必填，签名
        }
        wxRegister(weixinData, pageOption) // weixinData是微信配置信息，pageOption是分享要配置的内容
      },
      error: function (jqXHR) {
        weixinData = {
          appId: 'wxf3ce495cf3201936',
          timestamp: '',
          nonceStr: '',
          signature: ''
        }
        wxRegister(weixinData, pageOption) // weixinData是微信配置信息，pageOption是分享要配置的内容
      }
    });
  }

  window.addEventListener('resize', setDefaultFont);

  // 鼠标点击导航菜单
  $('.head .pc-nav .mid-nav ul li').off('click').on('click', function () {
    // 设置网页地址
    setUrlAnchor($(this).data('anchor'));
    // 滚动到相应锚点
    getUrlAnchor();
  })

  // 移动端点击菜单按钮
  $('.head .mobile-nav-box .right-nav .main-nav-bar').off('click').on('click', function () {
    if (!$(this).hasClass('active')) {
      openMenuNav();
    } else {
      closeMenuNav();
    }
  })

  // 设置默认字体
  function setDefaultFont () {
    const windowWidth = window.innerWidth; // 当前窗口的宽度
    let defaultFont;
    let fontSize;
    if (windowWidth >= 925) {
      defaultFont = 100 / 1920; // 表示1920的设计图,使用100px的默认值
    } else {
      defaultFont = 100 / 375; // 表示375的设计图,使用100px的默认值
    }
    fontSize = windowWidth * defaultFont; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    const html = document.documentElement;
    html.style.fontSize = fontSize + "px"; // 设置基础字体

    getUserAngent();
  }

  // 获取设备类型（是否是移动端像素宽度）
  function getUserAngent () {
    const winWidth = document.documentElement.clientWidth
    if (winWidth <= 925) {
      isMobile = true;
    } else {
      isMobile = false;
    }
  }

  // 打开移动端导航
  function openMenuNav () {
    $('.head .mobile-nav-box .right-nav .main-nav-bar').addClass('active');
    $('.mobile-nav-submenu').addClass('active');
    $('.mobile-mask').addClass('active');
    // 固定高度且不滚动的蒙版直接阻止触摸移动事件
    document.querySelector('.mobile-mask').addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
    // 菜单有可能会滚动的，加限制条件，在顶部或底部时阻止触摸移动事件
    let targetY = null
    const mobileNavDom = document.querySelector('.mobile-nav-submenu')
    mobileNavDom.addEventListener('touchstart', (e) => {
      targetY = Math.floor(e.targetTouches[0].clientY)
    })
    mobileNavDom.addEventListener('touchmove', (e) => {
      let newTargetY = Math.floor(e.targetTouches[0].clientY)
      let slideScrollTop = mobileNavDom.scrollTop
      let slideScrollHeight = mobileNavDom.scrollHeight
      let slideNavHeight = mobileNavDom.clientHeight
      if (slideScrollTop <= 0 && newTargetY - targetY > 0) {
        // 触摸向下移动
        e.preventDefault()
      } else if (slideScrollTop + 1 >= slideScrollHeight - slideNavHeight && newTargetY - targetY < 0) {
        // 触摸向上移动
        e.preventDefault()
      }
    }, false)
  }

  // 关闭移动端导航
  function closeMenuNav () {
    $('.head .mobile-nav-box .right-nav .main-nav-bar').removeClass('active');
    $('.mobile-nav-submenu').removeClass('active');
    $('.mobile-mask').removeClass('active');
  }

  // 鼠标点击移动端菜单，下拉菜单显隐
  $('.mobile-nav-submenu>ul>li').off('click').on('click', function () {
    // 菜单收起
    closeMenuNav();
    // 设置网页地址
    setUrlAnchor($(this).data('anchor'));
    setTimeout(function () {
      // 滚动到相应锚点
      getUrlAnchor();
    }, 800);
  })

  // 鼠标点击移动端蒙版，收起下拉菜单
  $('.mobile-mask').off('click').on('click', function () {
    // 菜单收起
    closeMenuNav();
  })

  // 滚动到指定锚点，并高亮导航
  function getUrlAnchor () {
    const anchorPoint = getQueryVariable('anchor');
    if (anchorPoint) {
      const headHeight = $('.head').height();
      setNavHighlight(anchorPoint);
      if ($('.mobile-body').css('display') === 'block') {
        switch (anchorPoint) {
          case 'introduction':
            $("html,body").animate({
              scrollTop: $("#mobile-section1").offset().top - headHeight
            }, 300);
            break;
          case 'framework':
            $("html,body").animate({
              scrollTop: $("#mobile-section2").offset().top - headHeight
            }, 300);
            break;
          case 'feature':
            $("html,body").animate({
              scrollTop: $("#mobile-section3").offset().top - headHeight
            }, 300);
            break;
          case 'area':
            $("html,body").animate({
              scrollTop: $("#mobile-section4").offset().top - headHeight
            }, 300);
            break;
          case 'support':
            $("html,body").animate({
              scrollTop: $("#mobile-section5").offset().top - headHeight
            }, 300);
            break;
            case 'aboutus':
            $("html,body").animate({
              scrollTop: $("#mobile-section6").offset().top - headHeight
            }, 300);
            break;
          default:
            break;
        }
      } else {
        switch (anchorPoint) {
          case 'introduction':
            $("html,body").animate({
              scrollTop: $("#section1").offset().top - headHeight
            }, 300);
            break;
          case 'framework':
            $("html,body").animate({
              scrollTop: $("#section2").offset().top - headHeight
            }, 300);
            break;
          case 'feature':
            $("html,body").animate({
              scrollTop: $("#section3").offset().top - headHeight
            }, 300);
            break;
          case 'area':
            $("html,body").animate({
              scrollTop: $("#section4").offset().top - headHeight
            }, 300);
            break;
          case 'support':
            $("html,body").animate({
              scrollTop: $("#section5").offset().top - headHeight
            }, 300);
            break;
            case 'aboutus':
            $("html,body").animate({
              scrollTop: $("#section6").offset().top - headHeight
            }, 300);
            break;
          default:
            break;
        }
      }
    }
  }

  // 获取地址query
  function getQueryVariable (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }

  // 根据锚点设置地址
  function setUrlAnchor (anchorPoint) {
    let query = window.location.href;
    let vars = query.split("?")[0];
    let newQuery = vars + '?anchor=' + anchorPoint;
    window.history.replaceState({}, 0, newQuery);
  }

  // 设置导航高亮
  function setNavHighlight (anchorPoint) {
    let anchorPointText = '';
    switch (anchorPoint) {
      case 'introduction':
        anchorPointText = '系统简介';
        break;
      case 'framework':
        anchorPointText = '系统架构';
        break;
      case 'feature':
        anchorPointText = '系统特点';
        break;
      case 'area':
        anchorPointText = '应用领域';
        break;
      case 'support':
        anchorPointText = '服务与支持';
        break;
      default:
        break;
    }

    // 顶部导航高亮
    $('.head .pc-nav .mid-nav ul li').each(function () {
      if ($(this).children('a').text().trim() === anchorPointText) {
        $(this).addClass('active').siblings('li').removeClass('active');
      }
    })

    // 移动端导航高亮
    $('.mobile-nav-submenu>ul>li').each(function () {
      if ($(this).children('a').text().trim() === anchorPointText) {
        $(this).addClass('active').siblings('li').removeClass('active');
      }
    })
  }
})