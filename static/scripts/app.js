(function(){
    window.Card = Backbone.Model.extend({
        urlRoot: CARD_API
    });

    window.Cards = Backbone.Collection.extend({
        urlRoot: CARD_API,
        model: Card,

        maybeFetch: function(options){
            // Helper function to fetch only if this collection has not been fetched before.
            if(this._fetched){
                // If this has already been fetched, call the success, if it exists
                options.success && options.success();
                return;
            }

            // when the original success function completes mark this collection as fetched
            var self = this,
                successWrapper = function(success){
                    return function(){
                        self._fetched = true;
                        success && success.apply(this, arguments);
                    };
                };
            options.success = successWrapper(options.success);
            this.fetch(options);
        },

        getOrFetch: function(id, options){
            // Helper function to use this collection as a cache for models on the server
            var model = this.get(id);

            if(model){
                options.success && options.success(model);
                return;
            }

            model = new Card({
                resource_uri: id
            });

            model.fetch(options);
        }
    });

    window.CardView = Backbone.View.extend({
        tagName: 'li',
        className: 'card',

        initialize: function(){
            this.model.bind('change', this.render, this);
        },

        render: function(){
            $(this.el).html(ich.cardTemplate(this.model.toJSON()));
            return this;
        }
    });

    window.Home = Backbone.View.extend({
        el: "#home",

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },

        render: function(){
            $(this.el).html(ich.homeTemplate({}));
            this.addAll();
        },

        initialize: function(){
            _.bindAll(this, 'addOne', 'addAll');

            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll, this);
            this.views = [];
        },

        addAll: function(){
            this.views = [];
            this.collection.each(this.addOne);
        },

        addOne: function(card){
            var view = new CardView({
                model: card
            });
            this.$("#cards").prepend(view.render().el);
            this.views.push(view);
        },
    });

    window.Router = Backbone.Router.extend({
        routes: {
            '': 'home',
        },

        home: function(){}
    });

    $(function(){
        window.app = window.app || {};
        app.router = new Router();
        app.cards = new Cards();
        app.home = new Home({
            el: $("#home"),
            collection: app.cards
        });
        app.router.bind('route:home', function(){
            app.cards.maybeFetch({
                success: _.bind(app.home.render, app.home)
            });
        });
        Backbone.history.start({
            pushState: true,
            silent: app.loaded
        });
    });
})();