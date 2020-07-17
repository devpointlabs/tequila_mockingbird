Rails.application.routes.draw do
 
  mount_devise_token_auth_for 'User', at: 'api/auth'
 
  namespace :api do
    resources :boozes

    resources :drinks do
      resources :boozedrinks
    end

    # TODO
      resources :boozes do
        resources :boozedrinks
    end
    
    resources :users, only: :update

    delete '/drinks/:id/boozedrinks', to: 'drinks#destroyBoozeDrink', as: 'destroyBoozeDrink'
  end
end
