$(document).ready(Core);

function Core()
{
    SetTabSwitcher();
    SetModal();
    InitOwlCarousel();
    InitSimpleLightbox();
    SetMobileMenu();
}

function SetTabSwitcher()
{
    $('.btn__tab__switch').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active'))
        {
            return;
        }

        $('.btn__tab__switch').removeClass('active');
        $(this).addClass('active');

        let targetTab = $(this).attr('target');

        SwitchTab(targetTab)
    })
}

function SwitchTab(target)
{
    
    $('.tab.active').animate({
        opacity: 0
    }, 500, function() {
        $('.tab.active').removeClass('active');

        $(`[tab-name="${target}"]`).css('opacity', 0);
        $(`[tab-name="${target}"]`).addClass('active');
        
        let tabHeight = $(`[tab-name="${target}"]`)[0].clientHeight;
        $(`[tab-name="${target}"]`).closest('.tab__viewer').css('height', `${tabHeight}px`)

        $(`[tab-name="${target}"]`).animate({
            opacity: 1
        }, 500)
    })
}

function SetModal()
{
    $('[modal]').on('click', function()
    {
        let modalId = $(this).attr('modal');
        ShowModal(`#${modalId}`);
    });

    $('.modal__dialog').on('click', function(e) {
        e.stopPropagation();
    });

    $('.modal').on('click', function() {
        HideModal(`#${$(this).attr('id')}`);
    });

    $('.btn__modal__close').on('click', function ()
    {
        let modalId = $(this).closest('.modal').attr('id');
        HideModal(`#${modalId}`);
    });
}

function ShowModal(modalId)
{
    $(modalId + ' .modal__dialog').off('animationend');
    $(modalId).addClass('active');
    $('body').addClass('lock');
    $(modalId + ' .modal__dialog').addClass('fadeInDownBig')
    
    $('body').append('<div class="modal__backdrop"></div>');
    setTimeout(function() {
        $('.modal__backdrop').addClass('active');
    }, 50)
}

function HideModal(modalId)
{
    $(modalId + ' .modal__dialog').removeClass('fadeInDownBig');
    $(modalId + ' .modal__dialog').addClass('fadeOutDownBig');
    $('.modal__backdrop').removeClass('active');
    $('body').removeClass('lock');
    $(modalId + ' .modal__dialog').on('animationend', function() {
        if (!$(modalId).hasClass('active'))
        {
            return;
        }
        $(modalId).removeClass('active');
        $(modalId + ' .modal__dialog').removeClass('fadeOutDownBig');
        $('.modal__backdrop').remove();
    });
}

function InitOwlCarousel()
{
    $('section.slider .owl-carousel').owlCarousel({
        items: 1,
        nav:true,
        dots: true,
        loop: true,
        autoplay: true,
        navContainer: '.slider__nav .nav',
        dotsContainer: '.slider__nav .dots'
    });

    $('.engineering__systems.owl-carousel').owlCarousel({
        items: 3,
        loop: true,
        center: true,
        autoWidth: true,
        navContainer: 'section.about__complex .slider__nav',
        nav:true,
        responsive: {
            992: {
                items: 3,
            },
            756: {
                items: 3,
                center: false,
                autoWidth: false,
            },
            576: {
                items: 2,
                center: false,
                autoWidth: false,
            },
            0: {
                items: 1,
                center: false,
                autoWidth: false,
            }
        },
        onInitialized: function()
        {
            $('.color').removeClass('color');
            $('.engineering__systems.owl-carousel .owl-item.center').prev().addClass('color');
            $('.engineering__systems.owl-carousel .owl-item.center').addClass('color')
            $('.engineering__systems.owl-carousel .owl-item.center').next().addClass('color')
        },
        onTranslated: function() 
        {
            $('.color').removeClass('color');
            $('.engineering__systems.owl-carousel .owl-item.center').prev().addClass('color');
            $('.engineering__systems.owl-carousel .owl-item.center').addClass('color')
            $('.engineering__systems.owl-carousel .owl-item.center').next().addClass('color')
        }
    })
}

function SetMobileMenu()
{
    $('.btn__menu').on('click', function() {
        if ($(this).hasClass('active'))
        {
            $(this).removeClass('active');
            $('header .mobile__menu').removeClass('active');
            $('body').removeClass('lock')
        }
        else
        {
            $(this).addClass('active');
            $('header .mobile__menu').addClass('active');
            $('body').addClass('lock')
        }
    })
}

function InitSimpleLightbox()
{
    $('section.about__complex .images__col a').simpleLightbox();
}