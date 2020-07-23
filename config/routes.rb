Rails.application.routes.draw do
 
  mount_devise_token_auth_for 'User', at: 'api/auth'
 
  namespace :api do

    resources :boozes

    resources :drinks do
      resources :boozedrinks
    end

    resources :drinks do 
      resources :comments
    end
    

    # TODO
      resources :boozes do
        resources :boozedrinks
    end
    
    resources :users, only: :update

    delete '/drinks/:id/boozedrinks', to: 'drinks#destroyBoozeDrink', as: 'destroyBoozeDrink'

    # ASSOCIATION PAGES
    get '/boozes/:id/drinks', to: 'boozes#booze_drinks', as: 'booze_drinks'
    get '/drinks/:id/boozes', to: 'drinks#drink_boozes', as: 'drink_boozes'
    # DRINK AUDITS
    get '/drinks/:id/audits', to: 'drinks#drink_audits', as: 'drink_audits'
    get '/boozes/:id/audits', to: 'boozes#booze_audits', as: 'booze_audits'

    # SearchBar
    get "search_drinks", to: "drinks#search_drinks"
    get "search_boozes", to: "boozes#search_boozes"

  end
end
