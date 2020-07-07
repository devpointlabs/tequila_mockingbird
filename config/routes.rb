Rails.application.routes.draw do
 
  mount_devise_token_auth_for 'User', at: 'api/auth'
 
  namespace :api do
    resources :boozes

    resources :drinks

    resources :users, only: :update
  end
 
end

gi

