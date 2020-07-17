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
<<<<<<< HEAD
=======

    delete '/drinks/:id/boozedrinks', to: 'drinks#destroyBoozeDrink', as: 'destroyBoozeDrink'
>>>>>>> b4f39d8ff1ecd745a6b219e700aff4d5c6294934
  end
end
