
Template.banner.onCreated(function() {
    Session.set("bannerHeight",this.data.height);
    this.subscribe("banners", this.data.group);
});
Template.banner.helpers({
    banners: function() {
        return Banners.find({}, {
            sort: {
                orderBy: -1
            }
        });
    },
    bannerHeight: function() {
        return Session.get("bannerHeight") ? Session.get("bannerHeight") : 240;
    }
});
Template.banner.onRendered(function() {
    Tracker.autorun(function() {
        var banners = Banners.find({}, {
            sort: {
                orderBy: -1
            }
        });
        if (banners.count()) {
            var mySwiper = new Swiper('.banner', {
                pagination: '.swiper-pagination',
                autoplay: 5000,
                loop: true,
                autoplayDisableOnInteraction: false
            });
        }

    });

});
